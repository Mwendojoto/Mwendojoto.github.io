const urlParams = new URLSearchParams(window.location.search);
var subfamily = urlParams.get('sub'), index=0;

for (var i=0; i<5; i++)
	{
		if (subs[i]==subfamily)
			index=i;
	}

var object=JSON.parse(SFamiliesJSON[index]);

var bandeau=document.getElementById('bande');//, fil='Orchidaceae > <b>'+subfamily+"</b>";
var fil="<a href='Index.html#classification'>Orchidaceae</a> > <b>"+subfamily+"</b>";
//bandeau.innerHTML=fil;

var title=document.getElementById('title'); //sentence='<b>Sous-famille des '+subfamily+'</b>'; //r�daction de l'en-t�te'

title.innerHTML=fil;

var intro="La sous famille des "+subfamily;
var liste="<ul class='general'>";

var counter=0, tribu;

for (var i=0; i<subfamilies.length; i++)
	{
		if (subfamilies[i][0]==subfamily)
		{
			counter++;
			tribu=subfamilies[i][1];
			liste+="<li><a href=\'Tribes.html?tib="+tribu+"&sub="+subfamily+"\'>"+tribu+"</a></li>";			
		}
	}
	
liste+="</ul>";

if (counter==1)
{
	intro+=" contient l'unique tribu des <a href=\'Tribes.html?tib="+tribu+"&sub="+subfamily+"\'>"+tribu+".</a>";
}

else
{
	var combien=counter.toString();
	intro+=" contient "+combien+" tribus.</a>";
	var tribus=document.getElementById('spisok');
	tribus.innerHTML=liste;
}

var torin=document.getElementById('introduction');

//torin.innerHTML=intro; ancienne disposition remplacée par le fichier JSON

var text="<b>Introduction. </b>"+object.Introduction;
document.querySelector("#intro").innerHTML=text;
text="<b>Diversité. </b>"+object.Diversity;
document.querySelector("#diversity").innerHTML=text;
text="<b>Géographie. </b>"+object.Geography;
document.querySelector("#geography").innerHTML=text;
text="<b>Caractéristiques. </b>"+object.Characteristics;
document.querySelector("#characteristics").innerHTML=text;
