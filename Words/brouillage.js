function brouille(string, rate){
	var trs='';
 	for (j=0; j<string.length; j++)
 		{
 			var a=string.charAt(j);
 			if (Math.random()<rate)
 					a=a.toUpperCase();
 			trs=trs.concat(a);
 		}
 	return trs;
}

function apparie() {

	var n=arry.length-nFind, text='', tab=[], indices=[], balises=[];
	change(0);
	currentElement=-nFind-1;
	bat=[];
	for (i=0; i<nDisplay; i++)
	{
	 	var x=Math.floor(Math.random()*n);
	 	var TokTok = arry[x];
	 	bat.push(TokTok);
	 	arry[x]=arry[n-1];
		arry[n-1]=TokTok;
		n--;
	}
	
	//tableau de mots à afficher
	for (i=0; i<nDisplay; i++)
	{
	 	var x=Math.floor(Math.random()*nSearch);
	 	//bat.push(tab[x]);
	 	indices.push(nFind+1);
	}
	
	n=nDisplay;
	for (i=0; i<nFind; i++)
	{
		balises.push(0);
	 	var x=Math.floor(Math.random()*n);
	 	var insert=buff[i], inters=buff[i];
	 	if (majuscules>0)
	 		{
	 			insert=brouille(buff[i], majuscules);
	 			inters=brouille(buff[i], majuscules);
	 		}
	 	var premier="<a id=\"now"+i+"\">"+insert+"</a>";
	 	bat=fuse(bat.slice(0,x),premier,bat.slice(x));
	 	indices=fuse(indices.slice(0,x),i,indices.slice(x));
	 	n++;
	 	x=Math.floor(Math.random()*n);
	 	var deuxieme="<a id=\"won"+i+"\">"+inters+"</a>";
	 	bat=fuse(bat.slice(0,x),deuxieme,bat.slice(x));
	 	indices=fuse(indices.slice(0,x),-i-1,indices.slice(x));
		n++;
	}

	for (i=0; i<bat.length; i++)
	{
		var celle=bat[i];
		if (!celle.includes("<"))
		{
			if (majuscules>0)
	 			celle=brouille(celle, majuscules);
			text=text+" <a id=\"non"+i+"\">"+celle+"</a>";
		}
		
		else
			text=text+" "+celle;
	}

	fileDisplayArea.innerHTML = text;

	var slovo=buff[nFind-1];
	buff=buff.slice(0,nFind-1);
	n=arry.length-nFind;

	var x=Math.floor(Math.random()*n);
	var TokT = [arry[x]];
	buff=TokT.concat(buff);
	arry[x]=slovo;
	arry[n-1+nFind]=TokT;
	
	found=0;

	squip(2*nFind+nDisplay, indices, balises);

	}//trie

function squip(k, indices, balises)
{
		if (k>-1) {			
			squip(k-1, indices, balises);
			var element=indices[k];
			if (element<nFind+1)
			{
				if (element>-1)
				{
					var name="now"+element;
					var nom="won"+element;
					var d=document.getElementById(name);
					var dd=document.getElementById(nom);
					d.addEventListener("click", function(){
					//alert(balises[element]);
					if ((currentElement==-element-1) && (balises[element]==0))
						{
							d.style.color="red";
							dd.style.color="red";
							found++;
							change(found);
							balises[element]=1;
						}
					currentElement=element;
					});
				}
				else
				{
					var truElem=-element-1;
					var name="won"+truElem;
					var nom="now"+truElem;
					var d=document.getElementById(name);
					var dd=document.getElementById(nom);
					d.addEventListener("click", function(){
					if ((currentElement==-element-1) && (balises[-element-1]==0))
						{
							d.style.color="red";
							dd.style.color="red";
							found++;
							change(found);
							balises[-element-1]=1;
						}
					currentElement=element;
					});
				}
			}
			else
				{
					var name="non"+k;
					var d=document.getElementById(name);
					d.addEventListener("click", function(){
						currentElement=element;
					});
				}
		}
}

function fuse(a,b,c)
{
	var d=a.concat(b);
	return(d.concat(c))	
}

function appatrie(){
	if (option==1)
		apparie();
	else
		trie();
}
function change(diff){
	var a = document.getElementById("mots");
	a.innerHTML=diff+"/"+nFind;
}

function sortBuffer(buff, arry){
n=arry.length-nFind;
var m=nFind;

fubb=[];

	for (var i=0; i<nFind; i++){
		if (Math.random()>percentage){
			//draw from buff
			var x=Math.floor(Math.random()*m);
			fubb.push(buff[x]);
			buff[x]=buff[m-1];
			//alert(buff);
			m--
		}
		
		else {	//draw from arry
			var x=Math.floor(Math.random()*n);
			var TokTok = arry[x];
			fubb.push(TokTok);
			arry[x]=arry[n-1+nFind];
			arry[n-1+nFind]=TokTok;
			n--
		}
	}

	return fubb;

}
