const urlParams = new URLSearchParams(window.location.search);
var tribe = urlParams.get('tib'), subfamily = urlParams.get('sub');

var title=document.getElementById('title');//sentence='<b>Tribu des '+tribe+'</b>'; //r�daction de l'en-t�te'

var bandeau=document.getElementById('bande');
var fil="Orchidaceae > <a href='Subfamilies.html?sub="+subfamily+"'>"+subfamily+"</a> > <b>"+tribe+"</b>";

title.innerHTML=fil;

var intro="La tribu des "+tribe;
var liste="<ul class='general'>";

var counter=0, soustribu="nan";

for (var i=0; i<tribes.length; i++)
	{
		if (tribes[i][0]==tribe)
		{
			counter++;
			soustribu=tribes[i][1];
			liste+="<li><a href=\'Subtribes.html?sib="+soustribu+"&tib="+tribe+"&sub="+subfamily+"\'>"+soustribu+"</a></li>";			
		}
	}
	
liste+="</ul>";

if (counter==1)
{
	intro+=" contient l'unique sous-tribu des <a href=\'Subtribes.html?sib="+soustribu+"&tib="+tribe+"&sub="+subfamily+"\'>"+soustribu+".</a>";
}

else
{
	var combien=counter.toString();
	intro+=" contient "+combien+" sous-tribus.</a>";
	var tribus=document.getElementById('spisok');
	tribus.innerHTML=liste;
}

var torin=document.getElementById('introduction');

torin.innerHTML=intro;

var rt=document.getElementById('return');
var retour="<a href=\'Subfamilies.html?sub="+subfamily+"\'>Retour aux "+subfamily+"</a>"
rt.innerHTML=retour;