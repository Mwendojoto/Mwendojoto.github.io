const urlParams = new URLSearchParams(window.location.search);
var tribe = urlParams.get('tib'), subtribe = urlParams.get('sib'), subfamily = urlParams.get('sub');

var title=document.getElementById('title');//sentence='<b>Tribu des '+tribe+'</b>'; //r�daction de l'en-t�te'

var bandeau=document.getElementById('bande'), fil='Orchidaceae > '+subfamily+' > <a href=Tribes.html?tib='+tribe+'&sub='+subfamily+'>'+tribe+'</a> > <b>'+subtribe+'</b>';

title.innerHTML=fil;

var intro='La sous-tribu des '+subtribe+' fait partie de la tribu des <a href=Tribes.html?tib='+tribe+'&sub='+subfamily+'>'+tribe+'</a>.';

var torin=document.getElementById('introduction');

torin.innerHTML=intro;

var liste="<ul>";

var counter=0, exemple="nan";

for (var i=0; i<examples.length; i++)
	{
		
		//alert("i "+i);
		
		if (examples[i][0]==subtribe)
		{
			counter++;
			exemple=examples[i][1];
			liste+="<li><i>"+exemple+"</i></li>";			
		}
	}
	
liste+="</ul>";

if (counter==1)

	liste="Exemple:<br>"+liste;

else

	liste="Exemples:<br>"+liste;


var primeri=document.getElementById('exemples');
	primeri.innerHTML=liste;