//On abandonne la décision par le contenu avec bloquage, mais on reprend les classes: Element pour la base, Phrase pour la page. 
//Tree et Node pourraient être abandonnés

//13 février, les correspondance marchent, avec une bonne gestion des mouvements


function Element(mot, att, tab) //fragment de mot, mot ou groupe de mots
{
	this.trans=[]; //règles de transformation
	this.trans.push([0,0,3,0,0,0,5]); //début
	this.trans.push([0,1,2,0,0,0,6]); //milieu
	this.trans.push([3,2,2,0,0,0,0]); //fin
	this.trans.push([0,0,0,4,4,5,0]); //mot
	this.trans.push([0,0,0,4,4,5,0]); //bloc
	this.trans.push([0,0,0,4,4,5,0]); //mot ou bloc fin de ligne
	this.trans.push([0,0,0,0,0,0,0]); //fin de mot fin de ligne
	
	this.tok=mot;
	this.typ=att;
	this.cont=tab;
	this.show=1; //-1: caché, 0: manque
		
	this.isEqual = function (autre)
		{
			var result=false;
			if ((this.tok==autre.tok) && (this.typ==autre.typ))
				result=true;
			return result;
		}
	
	this.ffuse = function (autre)
	{
		if (this.typ>4)
			this.tok=this.tok+"<br>"+autre.tok;
		else if (this.typ>2)
			this.tok=this.tok+" "+autre.tok;
		else
			this.tok=this.tok+autre.tok;
		
		this.typ=this.trans[this.typ][autre.typ];


		this.cont=this.cont.concat(autre.cont);

	}	
	
	this.bfuse = function (autre)
	{
		if (this.typ>2)
			this.tok=autre.tok+" "+this.tok;
		else
			this.tok=autre.tok+this.tok;
		
		this.typ=this.trans[autre.typ][this.typ];


		this.cont=autre.cont.concat(this.cont);

	}
	
	this.split = function (n)
	{
		var mot=this.tok.slice(0,n), tom=this.tok.slice(n);
		var t=1;
		if (this.typ==3)
			t=2;
		//alert(mot+" "+n);
		var result= new Element(tom,t,[]);
		
		if (this.typ=3)
			this.typ=0;
		this.tok=mot;
		
		return result;		
	}
	
	this.changeType = function (n)
		{
			this.typ=n;		
		}
}
  
function Phrase(phrase, champ, vide, stir, blocs, frags, save) //construit un dictionnaire et un répertoire d'indices
{
	this.memory=[];
	this.elements=[];
	this.mots=[]; //lexique
	this.indices=[]; //identité des éléments
	this.permutation=[];
	this.inverse=[];
	this.save=save;
	
	this.bIndices=this.indices; //	version un pas en arrière
	this.bPermutation=this.permutation;
	this.bInverse=this.inverse;
	this.bElements=this.elements;
	
	this.display=champ;
			
	var temporary=[], secondPos=1, large=0, liste=[];
	
	var tab=phrase.split(' ');
		
	for (var i=0; i<tab.length; i++)
		{
			var x, line=tab[i], pos=line.indexOf('\n');
			
			if (pos>0)
				{
					x=new Element(line.slice(0,pos),5,[]);
					temporary.push(x);
					x=new Element(line.slice(pos),3,[]);
					temporary.push(x);
				}
			
			else
				{			
					x=new Element(line,3,[]);
					temporary.push(x);
				}
		}
	
	large=0.5;//large/temporary.length;	
	
	if ((vide>0)||(frags>0))
		{
			makeList(vide,frags);
			makeField(blocs,this.elements);
		}
	
	else
			if (blocs)
				freeBlocks(this.elements);
			else
				this.elements=temporary;
		
	//création du lexique
	var k=0;
		
	for (var i=0; i<temporary.length; i++)
		{
			var j=0, isIn=false, y=temporary[i];
			
			while ((j<this.mots.length)&&(!isIn))
				{
					var z=this.mots[j];
					isIn=(y.isEqual(z));
					j++;
				}
			
			if (!isIn)
				{				
					y.cont=[k];
					this.indices.push(k);
					this.mots.push(y);
					k++;
				}
			
			else this.indices.push(j-1);
		}
			
	//construction des présences multiples
	this.corr=new Correlations();
	this.corr.fill(this.elements);
	this.bCorr=new Correlations();
	this.bCorr.fill(this.elements);
				
	//construction des permutations
	
	for (var i=0; i<this.elements.length; i++)		
	{
		this.permutation.push(i);
		this.inverse.push(i);
	}
	
	if (stir) {
		var n=this.permutation.length;
		
		for (var i=0; i<this.permutation.length; i++)
		{
		 	var x=Math.floor(Math.random()*n);
		 	var TokTok = this.permutation[x];
		 	this.permutation[x]=this.permutation[n-1];
			this.permutation[n-1]=TokTok;
			this.inverse[TokTok]=n-1;
			n--;
		}
	}
	
	//construction du serpent
	
	this.snake=new Serpent(this);
	this.snake.sentence=this;
			
	//fin de la construction 
	
	//fonctions de construction
	function makeList (p,q) {
		
		var p1=p, p2=q;
		
		if (large>0)
			p2=q/large;
		else 
			p2=0;
		
		if (p+q>.75)
			{
				p1=3*p/(4*(p+q));
				p2=3*q/(4*(p+q));
			}
						
		for (var i=0; i<temporary.length; i++)
			{
				var x=Math.random(), q1=p1, q2=p2;
							
				if (temporary[i].tok.length<4)
					q2=0;	
								
				if (x<q1+q2)
					if (x<q1)
						liste.push(0);
					else
						liste.push(2);
				else
					liste.push(1);
			}
	}
	
	function makeField (b,array) {
		if (b)
			{
				var inside=false, hidden=false, current;
			
				for (var i=0; i<temporary.length; i++)
					{						
						var brique=temporary[i];
												
						if (liste[i]==1)
							{
								if (inside)
										current.ffuse(brique);									
								else
									{
										brique.show=1;
										current=brique;
										inside=true;
									}
								hidden=false;
							}	
						
						else if (liste[i]==0)
							{
								if (inside)
									array.push(current);
								inside=false;
								if (hidden)
									brique.show=-1;
								else
									brique.show=0;
								hidden=true;
								array.push(brique);
							}
						
						else
							{
								if (inside)
									array.push(current);
								inside=false;
								hidden=false;
								brukim(brique,array);
							}							
					}
				
					if (inside)
						array.push(current);
			}
		else
			{
			
			for (var i=0; i<temporary.length; i++)
				{
					if (liste[i]<2)
						{
							temporary[i].show=liste[i];
							array.push(temporary[i]);
						}
					else brukim(temporary[i],array);				
				}
			}
	}
	
	function brukim(brique,array){
		
		var a=[], b=[];

		for (var ii=0; ii<brique.tok.length; ii++)
					a.push(ii);
							
		var j=0;

		while ((a.length>3)&&(j<120))
			{
				var x=Math.floor(Math.random()*(a.length-3))+2, pre=false, post=false, per=false, psot=false, start=x, l=1;
				var k=0, pg=true;
				while ((k<b.length)&&(pg))
					{
						if (a[x]<b[k])
							pg=false;
						k++;
					}
									
				if (pg)
					b.push(a[x]);		
				else b.splice(k-1,0,a[x]);
									
				if ((x>0)&&(a[x]==a[x-1]+1))
						pre=true;
				if ((x<a.length)&&(a[x]+1==a[x+1]))
						post=true;
				if (pre)
					{
						start--;
						l++;
					}

				if (post)
						l++;

				if ((x>1)&&(a[x]==a[x-2]+2))
						per=true;
									
				if ((x<a.length-1)&&(a[x]+2==a[x+2]))
						psot=true;
									
				if (per)
					if (psot)
						if (Math.random()<.5)
							{
								start--;
								l++;					
							}
						else
								l++;
						else
							{
								start--;
								l++;					
							}
						else
								l++;		
									
				a.splice(start,l);
				j++;
			}
									
		var back=[];
							
		for (j=b.length-1; j>-1; j--)
			{
				var temp = brique.split(b[j]);
				back.push(temp);					
			}
		
		back.push(brique);
							
		for (j=back.length-1; j>-1; j--)
				array.push(back[j]);
							
	}
	
	function freeBlocks(array) {
	
	var a=[], b=[];

	for (var i=0; i<temporary.length; i++)
			a.push(i);
	
	var j=0;

	while ((j<9)&&(a.length>3))
		{
			
			var x=Math.floor(Math.random()*(a.length-3))+2, pre=false, post=false, start=x, l=1;
			var k=0, pg=true;
			while ((k<b.length)&&(pg))
				{
					if (a[x]<b[k])
						pg=false;
					k++;
				}
			
			if (pg)
				b.push(a[x]);		
			else
				b.splice(k-1,0,a[x]);
			
			if ((x>0)&&(a[x]==a[x-1]+1))
				pre=true;
			if ((x<a.length)&&(a[x]+1==a[x+1]))
				post=true;
			
			if (pre)
				{
					start--;
					l++;
				}

			if (post)
					l++;
			
			a.splice(start,l);
					
			j++;
		}
	
	j=0;
	
	b.push(temporary.length);
		
	var current=temporary[0], bond=b[0];
	
	for (var i=1; i<temporary.length; i++)
		{
			if ((i<bond)&&(current.typ<5))
			current.ffuse(temporary[i]);
			
			else
				{
					array.push(current);
					current=temporary[i];
					if (i==bond){
						j++;
						bond=b[j];
					}
				}
		}
	
		array.push(current);
	}
	
	//méthodes
	
	this.invert=function()
	{
		this.inverse=[];
		for (var i=0; i<this.permutation.length; i++)
				this.inverse.push(-1);
		for (var i=0; i<this.permutation.length; i++)
			{
				if (this.permutation[i]>-1)
					this.inverse[this.permutation[i]]=i;
			}
	}
		
	this.addToMots=function(mot)	
	{
		var isIn=false, j=0, response;
		
		while ((j<this.mots.length)&&(!isIn))
			{
				var z=this.mots[j];
				isIn=(mot.isEqual(z));
				j++;
			}
		
		if (!isIn)
			{				
				this.mots.push(mot);
				response=this.mots.length-1;
			}
		else
			response=j-1;
		
		return response;
	}
					
	this.toText = function()
	{
			var text='';
			
			for (var i=0; i<this.elements.length; i++)
			{
				if (this.elements[i].typ>3)
					text=text+" <a style=\"background-color:#b6dae8\">"+this.elements[i].tok+"</a>";
					//text=text+" <a style=\"background-color:#a6c8e0\">"+this.elements[i].tok+"</a>";
				else if ((this.elements[i].typ==3)||(this.elements[i].typ==0))
					text=text+" "+this.elements[i].tok;
				else
					text=text+this.elements[i].tok;
			}

				return text;
	}	
	
	
	this.toHTML = function(m)
	{
		//var text='<button id=\"plBtn2\" style=\"font-size:15px;\" onclick=\"hide(2)\">-</button><br>', j=0;
		var text='', j=0;
		
		for (var i=0; i<this.elements.length; i++)
			{
												
			if (this.elements[this.permutation[i]].show>-2)
			{
				var infix, z, t=4;
				
				if (this.elements[this.permutation[i]].show>0)
				{
					z=this.elements[this.permutation[i]].tok;
					t=this.elements[this.permutation[i]].typ;
					j++;
				}
				
				else //boutons pour entrer des mots
					{
						if (m==i)
							z="<button id=\"minusBtn\" style=\"font-size:22px;\" onclick=\"shrink("+i+")\">-</button><input type=\"text\" id=\"inpoot\" style=\"font-size:20px;\" name=\"name\" required   size=\"4\" autofocus><button id=\"myBtn\" style=\"font-size:22px;\" onclick=\"psefisato("+i+")\">▶</button> ";		
		
						else if (this.elements[this.permutation[i]].show>-1)
							z="<button id=\"plusBtn\" style=\"font-size:22px;\" onclick=\"expand("+i+")\">+</button></font> ";
						else
							z="";
					}
					
				
				//gestions de l'entrée, sortie de la souris
				infix=" id=\"bloc"+i+"\" onmousedown=\"mD("+i+")\" onmouseup=\"mU("+i+")\" onmouseenter=\"mE("+i+")\" onmouseleave=\"mL("+i+")\">"+z+"</a> ";				
				
				
				//alternance des couleurs
				if (this.elements[this.permutation[i]].show>0)
					{
						if (t==0)
							infix="<a style=\"background-color:#50aa64\""+infix;
						
						else if (t==1)
							infix="<a style=\"background-color:#ffcc99\""+infix;
							
						else if (t==2)
							infix="<a style=\"background-color:#9999ff\""+infix;						
							
						else 
						
						{	
							var dex=this.snake.list[i];
							if (dex==0)						
								infix="<a style=\"background-color:#ECF6F6\""+infix;
							else if (dex==1)
								infix="<a style=\"background-color:#F5EED6\""+infix;
							else
								infix="<a style=\"background-color:#EAF7DA\""+infix;
						}
					}
				
				else
					infix="<a "+infix;
				
				text=text+infix;				
			}
		}
		
		var backButton = "<button id=\"backBtn\" style=\"font-size:22px;\" onclick=\"back()\">←</button><br><button id=\"stir\" style=\"font-size:25px;\" onclick=\"layOut(true,false,true)\">×</button>";
	
	text="<p onmouseleave=mClear()>"+text+" "+backButton+"</p>";

	return text;
}
	
	this.compare=function(str1,str2)
	{
		var a=str1.split(/['’]+/), b=str2.split(/['’]+/);
		
		var isEqual=false;					
								
		if (a.length==b.length)
					{
						isEqual=true;
						var i=0;
						while ((i<a.length)&&(isEqual))
								{
									if (a[i]!=b[i])
										isEqual=false;
									i++;
								}
					}
		
		return isEqual;
	}	
	
	this.incorporate=function(n,string)
	{
		var isIn=false, j=0, a=string.split(' ');
						
		while ((j<this.elements.length-a.length+1)&&(!isIn))
			{
				var k=0, correspond=true; 
				while ((k<a.length)&&(correspond))
				{
					//alert('a '+this.mots[this.indices[j+k]].tok+' b '+a[k]);
					
					var x=this.compare(this.elements[j+k].tok,a[k]), y=(this.elements[j+k].show<1);
					
					if (!(x&&y))
							correspond=false;
							//chercher un même mot disponible
						k++;
				}
				if (correspond)
					isIn=true;					
				j++;
			}
		//alert(j);
		
		if (isIn)
			{
					this.archive();
					//alert(this.permutation);
					
					if (a.length>1)
					{
						var x=this.elements[j-1], y=new Element(x.tok,x.typ,x.cont);
							
						for (var k=1; k<a.length; k++)
							{
								y.ffuse(this.elements[j]);
								this.elements.splice(j,1);
								
								var l=this.permutation[j];
								this.permutation.splice(j,1);
												
								for (var i=0; i<this.permutation.length; i++)
									if (this.permutation[i]>l)
										this.permutation[i]-=1;
							}
							
						this.elements[j-1]=y;
							
						this.invert();
						this.corr.fill(this.elements);
						
						//alert(y.tok);
					}

						//inutile ! utile en fait
						
						var low=j-1, fits=true;
						while ((fits)&&(low>0))
							{	
								low--;
								if (this.elements[low].show>0)
									fits=false;
							}
						
						if (!fits)
							low++;
						
						//alert(low);
						
						var nose=n;
						if (low<j-1)
							nose++;
						
						this.elements[j-1].show=1;
						/*this.permutation[this.inverse[j-1]]=this.permutation[n+j-low];
						this.inverse[j-1]=n+j-low;
						this.permutation[n+j-low]=j-1;*/
						
						this.permutation[this.inverse[j-1]]=this.permutation[nose];
						this.inverse[this.permutation[nose]]=this.inverse[j-1];
						this.inverse[j-1]=nose;
						this.permutation[nose]=j-1;
						
						if (j<this.elements.length)
							if (this.elements[j].show<0)
								this.elements[j].show=0;
								
						//
						//alert(this.permutation);			
			}
		
	
	//if ((isEqual)&&(this.inverse[j]<=-1)){

		return isIn;
	}
				
	this.match=function (n,m) //marche, donne la compatibilité dans l'ordre des positions n et m
	{
		var direction=0, o=this.permutation[n], p=this.permutation[m], text='a ', t1=this.elements[o].typ, t2=this.elements[p].typ;
		
		var comp=[]; //règles de compatibilité
		comp.push([0,1,1,0,0,0,0]); //début
		comp.push([0,1,1,0,0,0,0]); //milieu
		comp.push([0,0,0,0,0,0,0]); //fin
		comp.push([0,0,0,1,1,1,0]); //mot
		comp.push([0,0,0,1,1,1,0]); //bloc
		comp.push([0,0,0,1,1,1,0]); //fin de ligne
		comp.push([0,0,0,0,0,0,0]); //fin de mot, de ligne
		
		if ((this.elements[o].show>0)&&(this.elements[p].show>0)){	
						
			//correspondance directe	
			if ((this.permutation[n]==this.permutation[m]-1)&&(comp[t1][t2]>0))
					direction=1;
			else if ((this.permutation[n]-1==this.permutation[m])&&(comp[t2][t1]>0))
					direction=-1;
			
			//correspondance indirecte
			else if ((this.corr.table[this.permutation[n]].length>1)||(this.corr.table[this.permutation[m]].length>1))
				{
					var x=this.corr.table[this.permutation[n]], y=this.corr.table[this.permutation[m]], i=0, out=true;
										
					while ((i<x.length)&&(out))
						{
							var j=0;
							
							while ((j<y.length)&&(out))
								{
									if ((x[i]==y[j]-1)&&(comp[t1][t2]>0))
										{
											o=x[i];
											p=y[j];
											direction=1;
											out=false;
										}
									else if ((x[i]-1==y[j])&&(comp[t2][t1]>0))
										{
											o=x[i];
											p=y[j];
											low=y[j];
											direction=-1;
											out=false;
										}
									j++;
								}
							i++;
						}			
				}
			
			if (o!=this.permutation[n])
				{
					var l=this.inverse[o];
					this.inverse[o]=n;
					this.permutation[l]=this.permutation[n];
					this.inverse[this.permutation[n]]=l;
					this.permutation[n]=o;
				}
			
			if (p!=this.permutation[m])
				{
					var l=this.inverse[p];
					this.inverse[p]=m;
					this.permutation[l]=this.permutation[m];
					this.inverse[this.permutation[m]]=l;
					this.permutation[m]=p;
				}
					
			if (direction!=0) //fusion et recombinaison
				{			
					this.archive();
					
					var a=n, b=m;
					
					if (direction==-1)
						{
							a=m;
							b=n;
						}

					var copied=this.elements[this.permutation[a]]; 
					first=new Element(copied.tok, copied.typ, copied.cont);
					first.ffuse(this.elements[this.permutation[b]]);
					this.elements[this.permutation[a]]=first;				
					this.elements.splice(this.permutation[b],1);
					
					var l=this.permutation[n];
									
					this.permutation.splice(n,1);
									
					for (var i=0; i<this.permutation.length; i++)
						if (this.permutation[i]>l)
							this.permutation[i]-=1;
					
					this.invert();
					this.corr.fill(this.elements);
					//alert(this.toText());
				}
		}
				
		return direction*direction;
	}
			
	this.swap=function(m,n)
	{
		this.archive();
		
		if (m<n)  //ascendant
			{
				this.permutation.splice(n+1,0,this.permutation[m]);
				this.permutation.splice(m,1);
			}
		
		else			
			{
				this.permutation.splice(n,0,this.permutation[m]);
				this.permutation.splice(m+1,1);
			}
		
		this.invert();
		
		if (this.elements.length>2)
			this.snake.swap(m,n);
	}
	
	this.upDate=function()
	{	
		//alert(this.toText());
		this.snake.smooth();
		this.display.innerHTML=this.toHTML(-1);
	}
	
	this.archive=function() //duplication des données avant modification
	{
		var mnemo=[];
		mnemo.push(this.elements.slice());
		mnemo.push(this.permutation.slice());
		var show=[];
		for (var i=0; i<this.elements.length; i++)
				show.push(this.elements[i].show);
		mnemo.push(show);
		this.memory.push(mnemo);
		this.snake.push();
	}
	
	this.previous=function()
	{
		//this.indices=this.bIndices;
		/*this.elements=this.bElements;
		this.permutation=this.bPermutation;
		this.invert();
		this.corr.fill(this.elements);*/
		
		var n=this.memory.length-1;
		
		if (n>-1)
		{
			var row=this.memory[n];
			
			this.elements=row[0];
			this.permutation=row[1];
			this.invert();
			this.corr.fill(this.elements);
			
			var show=row[2];
			
			for (var i=0; i<this.elements.length; i++)
				this.elements[i].show=show[i];
			
			this.memory.splice(n,1);
			
			this.snake.pop();
			
			this.display.innerHTML=this.toHTML(-1);
		}
	}
		
} //fin de phrase

function Correlations()
{
	this.table=[];
	
	this.fill=function(tab)
	{
		this.table=[];
		
		for (var i=0; i<tab.length; i++)
		{
			this.table.push([]);
		
			for (var j=0; j<tab.length; j++)
				{
					if (tab[i].isEqual(tab[j]))
						this.table[i].push(j);							
				}
		}
	}
}

function Serpent(phrase)
{
	this.list=[];
	this.memory=[];
	this.sentence=phrase;
	
	this.init=function(){
		
		//alert(this.sentence.elements.length);
				
		var snake=[];
				
		for (var i=0; i<this.sentence.elements.length; i++)
			{
				this.list.push(-1);
				
				//if ((this.sentence.elements[this.sentence.permutation[i]].show<0)||(this.sentence.elements[this.sentence.permutation[i]].typ<3))
				if ((this.sentence.elements[this.sentence.permutation[i]].show>-1)&&(this.sentence.elements[this.sentence.permutation[i]].typ>2))
						snake.push(i);			
				
			}
		
		var n=snake.length;
		for (var i=0; i<n-2; i++)
			this.list[snake[i]]=i%3;
		
		if (n%3==1)
			{
				this.list[snake[n-2]]=2;
				this.list[snake[n-1]]=0;			
			}
		
		else
			{
				this.list[snake[n-2]]=1;
				this.list[snake[n-1]]=0;			
			}
		
		//alert(this.list);
	}
	
	this.push=function()
		{
			this.memory.push(this.list.slice());
		}
	
	this.pop=function()
		{
			var n=this.memory.length-1;
			
			if (n>-1)
				this.list=this.memory[n];
			
			this.memory.splice(n,1);			
		}
	
	this.clip=function(n)
	{
		this.list.splice(n,1);
	}
	
	this.swap=function(m,n)
	{
		//contrôle en amont, this.list.length>2;
				
		if (m<n)  //ascendant
			{
				this.list.splice(n+1,0,this.list[m]);
				this.list.splice(m,1);
			}
		
		else			
			{
				this.list.splice(n,0,this.list[m]);
				this.list.splice(m+1,1);
			}
	}
	
	this.smooth = function(){
				
		if (this.list.length>2)
		{
			var n=this.list.length-2;
			
			if ((this.sentence.permutation[n+1]==n+1)&&(this.list[n+1]>-1))
				{
					this.list[n+1]=0;
					if (this.list[n]==0)
						{
							this.list[n]=1;
							n--;
						}
				}
			
			for (var i=n; i>0; i--)
				{
				 	if ((this.list[i]==this.list[i+1])&&(this.list[i]>-1))
				 		this.list[i+1]=(this.list[i]+this.list[i+2]+1)%3;	
				}
			
			if ((this.sentence.permutation[0]==0)&&(this.list[0]>-1))
				this.list[0]=0;
			
		 	if ((this.list[0]==this.list[1])&&(this.list[0]>-1))
		 		this.list[1]=(this.list[0]+this.list[2]+1)%3;	
			
		}
	}	
}
