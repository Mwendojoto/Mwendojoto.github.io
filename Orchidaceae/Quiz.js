var mock="", current=true;
var niveauQuestions=[0,1,3,1,0,1,1,3], nQ=2; //types de questions: 0=tribu dans sous-famille, 1=sous-tribu dans tribu, 3=sous-tribu dans sous-famille; nQ contient la valeur courante
var nQuestion=0;//indice croissant qui parcourt niveauQuestions
var nJ=0, nF=0;//nombre de réponses justes, fausses respectivement
var subCheat=[1,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,23];//paires tribu/sous-famille dont l'apprtenance n'est pas évidente
var tribCheat=[4,5,9,10,11,12,14,15,16,17,18,19,20,21,22,23,24,26,27,28,29,30,31,34,35,36,37,39,40,41,42,43,44,45,46,47,48,50,54,58];//paires tribu/sous-tribu dont la correspondance n'est pas trop facile à deviner
var tribSubCheat=[1,4,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58];//paires sous-famille/sous-tribu dont la correspondance n'est pas trop facile à deviner
var tribLimits=[0,1,2,3,4,8,9,18,26,32,33,34,38,48,50,52,53,55,56,57,59,60,61,62]; //limites des tribus dans les sous-tribus
//subCheat et tribCheat sont permutés tout au long de chaque session, mais l'ordre de leur contenu importe peu
//tribLimits reste intouché, car l'ordre y est primordial

//déclaration des trois éléments variables de la question
var high=document.querySelector("#higher");
var low=document.querySelector("#lower");
var nom=document.querySelector("#lowName");

//déclaration des trois réponses possibles
var ans=[];
ans.push(document.querySelector("#ch1"));
ans.push(document.querySelector("#ch2"));
ans.push(document.querySelector("#ch3"));
//les trois possibilités dont il faut trouver la bonne

var colours=["#ffe6e6","#fff0e6","#e6f2ff"]; //trois couleurs pour les questions, histoire de marquer la transition d'une question à la suivante

var couple=""; //bonne réponse qu'il faut donner
sum=document.querySelector("#summary"); //résumé des dernièrs réponses correctes qu'il allait trouver

var juste; //numéro (0,1 ou 2) de la bonne réponse

function sort (tab,n){ //choisit au hasard un élément parmi les n premiers d'un tableau, puis l'intervertit avec le n+1ème, pour un nouveau choix aléatoire parmi les n-1 premiers éléments du tableau

/*quand la fonction est itérée sur un même tableau de longueur n pour des valeurs décroissantes allant de n-1 à 1, elle produit à la fin un tableau complètement permuté*/

    var r=Math.floor((n+1)*Math.random());
    var a=tab[r];
    tab[r]=tab[n];
    tab[n]=a;
    return a;
}

function clear () 
{
    var button = document.querySelector("#choice1");
    button.checked=false;
    button = document.querySelector("#choice2");
    button.checked=false;
    button = document.querySelector("#choice3");
    button.checked=false;
}

function isChecked ()
{
    var ans=false, button = document.querySelector("#choice1");
    ans=ans||button.checked;
    button = document.querySelector("#choice2");
    ans=ans||button.checked;
    button = document.querySelector("#choice3");
    ans=ans||button.checked;
    return ans;
}

var form=document.querySelector("#question");


form.addEventListener(
  "submit",
  function (event) {
    
    var output=-1; //valeur initiale, avant réponse de l'utilisateur
    
    var button = document.querySelector("#choice1");
    if(button.checked)
        output=0;
    button = document.querySelector("#choice2");
    if(button.checked)
        output=1;
    button = document.querySelector("#choice3");
    if(button.checked)
        output=2;

    if (output==juste)
    {
        nJ++;
        current=true;
    }
    else if (output>-1)
    {
        nF++;
        current=false;
    }
    
    event.preventDefault();

    clear();

    if (output>-1) {
        document.querySelector("#juste").innerHTML=" "+nJ.toString();
        document.querySelector("#faux").innerHTML=" "+nF.toString();

        if (!current)
            vrai="<font color='red'>"+vrai+"</font>";
        
        couple+=vrai+"<br>";

        nQuestion++;
        if (nQuestion<niveauQuestions.length)
            ask(nQuestion);
        else
        {
            var reference="Summary.html?result="+couple+"&score="+nJ;
            window.location.href = reference;
        }
    }
  },
  false,
);

function ask(n) /*(var k=0; k<6;niveauQuestions.length; k++)*/ //boucle des questions: le type de question (tribu ou sous-tribu à replacer) est contenu dans "niveauQuestions"
{   
    nQ=niveauQuestions[n];
    var quesN=n+1;
    document.querySelector("#namba").innerHTML="Question "+quesN+" de 8";

    //allocation des couleurs, pour marquer la transition entre les questions
    document.querySelector("#namba").style.backgroundColor = colours[n%3];
    document.querySelector("#vopros").style.backgroundColor = colours[(n+1)%3];
    document.querySelector("#choice").style.backgroundColor = colours[(n+2)%3];

    if (nQ==0) { //il s'agit de trouver à quelle sous-famille appartient une tribu donnée
    var pair=subfamilies[sort(subCheat,subCheat.length-n-1)]; //identification de la tribu à trouver

    var isIn=false, j=0;
    while ((j<5)&&(!isIn)) //recherche de l'indice de la sous-famille correspondante
    {
        if (pair[0]==subs[j])
            isIn=true;
        j++;
    }

    var sousF=[]; //création d'un tableau d'indices sans la sous-famille choisie
    for (var i=0; i<5; i++)
    {
        if (i!=j-1)
            sousF.push(i);
    }

    for (var i=3; i>1; i--)
    {
        var x=sort(sousF,i); //x n'est pas utilisé: c'est les positions qu'on permute
    }

    var positions=[0,1,2]; //positions des réponses possibles.

    for (var i=2; i>-1; i--)
    {
        var x=sort(positions,2); //x n'est pas utilisé: c'est les positions qu'on permute
    }

    vrai=pair[0]+" > "+pair[1];

    juste=positions[0];

    //réponse à la question précédente

    high.innerHTML="sous-famille";
    low.innerHTML="tribu";
    nom.innerHTML=pair[1];
    
    ans[positions[0]].innerHTML=subs[j-1];
    ans[positions[1]].innerHTML=subs[sousF[3]];
    ans[positions[2]].innerHTML=subs[sousF[2]];
}

else if (nQ<2) { //il s'agit de trouver à quelle tribu appartient une sous-tribu donnée
    var index=sort(tribCheat,tribCheat.length-n-1); //indice de la sous-tribu à trouver

    mock=index+" "+tribCheat.toString();

    var isIn=false, j=0;
    while ((j<24)&&(!isIn)) //recherche de l'indice de la tribu correspondante (avec une stratégie différente du premier cas, en utilisant le tableau tribLimits)
    {
        if (index<tribLimits[j])
            isIn=true;
        j++;
    }

    //j vaut au moins deux, car la première étape est franchie même avec 0, et l'itération se fait le coup d'après même en cas d'échec

    var Tri=[]; //création d'un tableau d'indices sans la tribu choisie
    for (var i=0; i<24; i++)
    {
        if (i!=j-2)
            Tri.push(i);
    }

    for (var i=22; i>20; i--)
    {
        var x=sort(Tri,i); //x n'est pas utilisé: c'est les positions qu'on permute
    }

    //alert(Tri);

    var positions=[0,1,2]; //positions des réponses possibles.

    for (var i=2; i>-1; i--)
    {
        var x=sort(positions,2); //x n'est pas utilisé: c'est les positions qu'on permute
    }

    //alert(positions);
    high.innerHTML="tribu";
    low.innerHTML="sous-tribu";
    nom.innerHTML=tribes[index][1];

    vrai=tribes[index][0]+" > "+tribes[index][1];

    //alert(couple);

    juste=positions[0];

    ans[positions[0]].innerHTML=subfamilies[j-2][1];
    ans[positions[1]].innerHTML=subfamilies[Tri[21]][1];
    ans[positions[2]].innerHTML=subfamilies[Tri[22]][1];
}

else { //il s'agit de trouver à quelle sous-famille appartient une sous-tribu donnée
    var index=sort(tribSubCheat,tribSubCheat.length-n-1); //indice de la sous-tribu à trouver

    mock=index+" "+tribCheat.toString();

    var isIn=false, k=0;
    while ((k<24)&&(!isIn)) //recherche de l'indice de la tribu correspondante en utilisant le tableau tribLimits
    {
        if (index<tribLimits[k])
            isIn=true;
        k++;
    }

    isIn=false, j=0;
    while ((j<5)&&(!isIn)) //recherche de l'indice de la sous-famille correspondante
    {
        if (subfamilies[k-2][0]==subs[j])
            isIn=true;
        j++;
    }

    var sousF=[]; //création d'un tableau d'indices sans la sous-famille choisie
    for (var i=0; i<5; i++)
    {
        if (i!=j-1)
            sousF.push(i);
    }

    for (var i=3; i>1; i--)
    {
        var x=sort(sousF,i); //x n'est pas utilisé: c'est les positions qu'on permute
    }

    var positions=[0,1,2]; //positions des réponses possibles.

    for (var i=2; i>-1; i--)
    {
        var x=sort(positions,2); //x n'est pas utilisé: c'est les positions qu'on permute
    }

    vrai=subs[j-1]+" > "+tribes[index][1];
    
    juste=positions[0];

    //réponse à la question précédente
    
    high.innerHTML="sous-famille";
    low.innerHTML="sous-tribu";
    nom.innerHTML=tribes[index][1];

    ans[positions[0]].innerHTML=subs[j-1];
    ans[positions[1]].innerHTML=subs[sousF[3]];
    ans[positions[2]].innerHTML=subs[sousF[2]];
}

}

ask(nQuestion);