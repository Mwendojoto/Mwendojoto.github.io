        var nam1=[1,1,1,4,4]; //nombre de tribus par sous-famille
        var nam2=[[1],[1],[1],[1,3,3,3],[1,3,3,3]];//nombre de sous-tribus par tribu de chaque sous-famille
        var n1=1, n2=1; //valeurs en cours prises dans les tableaux ci-dessus: comme on commence avec les Apostasioidae, il n'y a qu'une sous-tribu, avec une seule sous-tribu
        var SF=["Apostasia","Pogonia","Cypripedium","Ophrys","Bulbophyllum"]; //photos des sous-familles
        var OR=["Orchidoideae","Cranichidae", "Spiranthinae", "Pterostylidinae"]; //tribus des Orchidoideae
        var ORPH=["Ophrys","Cranichis_muscosa","Spiranthes_cernua","Pterostylis_coccinea"]; //photos des tribus des Orchidoideae
        var ORR=[["Orchidoideae"],["Cranichidinae", "Spiranthinae", "Pterostylidinae"],["Coryciinae","Disinae","Orchidinae"],["Diuridinae","Caladeniinae","Drakaeinae"]];//sous-tribus des Orchidoideae
        var ORRPH=[["Ophrys"],["Cranichis_muscosa","Spiranthes_cernua","Pterostylis_coccinea"],["Corycium_ingeanum","Disa_cardinalis","Serapias_lingua"],["Diuris_orientis","Caladenia","Drakaea_confluens"]];//photos des sous-tribus des Orchidoideae
        var EP=["Malaxidae","Epidendrae","Vandeae","Cymbidieae"];//tribus des Epidendroidae
        var EPPH=["Bulbophyllum","Laelia","Angraecum_sesquipedale","Cymbidium"]; //photos des tribus des Epidendroidae
        var EPP=[["Dendrobiinae"],["Laeliinae", "Bletiinae", "Pleurothallidinae"],["Angraecinae", "Aeridinae", "Polystachyinae"],["Cymbidiinae", "Oncidiinae", "Catasetinae"]]; //sous-tribus des Epidendroidae
        var EPPPH=[["Bulbophyllum"],["Laelia", "Bletia_catenulata", "Pleurothallis_cordata"],["Angraecum_sesquipedale", "Aerides_odorata", "Polystachya_pubescens"],["Cymbidium", "Oncidium", "Catasetum_tenebrosum"]]; //photos des sous-tribus des Epidendroidae

        // incorporation des informations dans un seul tableau /*
        var tableau=[];
        tableau.push(subs);
        tableau.push(SF);
        //ajout de tableaux vides pour obtenir une formule unique vers les quatre tableaux des deux sous-familles avec photos en plus.
        tableau.push([]);
        tableau.push([]);
        tableau.push([]);
        tableau.push([]); //tableaux vides pour les Apostasioidae (qui n'ont pas de photos en plus).
        tableau.push([]);
        tableau.push([]);       
        tableau.push([]);
        tableau.push([]); //tableaux vides pour les Cypripedioidae (qui n'ont pas de photos en plus).
        tableau.push([]);
        tableau.push([]);
        tableau.push([]);
        tableau.push([]); //tableaux vides pour les Vanilloidae (qui n'ont pas de photos en plus).
        tableau.push(OR);
        tableau.push(ORPH);
        tableau.push(ORR);
        tableau.push(ORRPH); //Orchidoideae
        tableau.push(EP);
        tableau.push(EPPH);
        tableau.push(EPP);
        tableau.push(EPPPH); //Epidendroidae
        //incorporation des différentes informations dans un seul tableau */

        var cad=document.getElementById("film");
        
        function extractGenus (A){
            var fP=A.indexOf("_"), word; //extrait le genre du nom de la photo.
            if (fP>-1) //si l'argument contient un "_"
                {
                    word=A.slice(0,fP);
                    return word;
                }
            
            else
                return A;
        }

    $(function () {

            var i = 0 /*index des sous-familles*/, j = 0 /*index des tribus*/, k=0 /*index des sous-tribus*/;

            var level=0; //niveau auquel on se situe: 0=sous-famille, 1=tribu, 2=sous-tribu.

            function computeIndex (l) {
            //calcul de l'index de ligne des noms dans "tableau", en fonction de i et j.
            //la ligne des images s'obtient en rajoutant 1.
            var log=0, gol=0;
            if (l>0)
                {
                    log=1;
                    if (l>1)
                    gol=1;
                }
             return log*(2+i*4)+gol*2;
            }

            function generateFullName() //donne à chaque fois la hiérarchie complète de chaque espèce représentée
            {
                var result="<span class='petites-capitales'><b>"+tableau[0][i]+"</b></span>";

                if (level>0)
                {
                    var cI1=computeIndex(1), cI2=computeIndex(2);
                    result+=": <span class='petites-capitales'>"+tableau[cI1][j]+"</span>";
                    
                    if (level>1)
                    {
                        result+=": "+tableau[cI2][j][k];
                        result+=": <i>"+extractGenus(tableau[cI2+1][j][k])+"</i>";
                    }

                    else
                        result+=": <i>"+extractGenus(tableau[cI1+1][j])+"</i>";
                }

                else result+=": <i>"+extractGenus(tableau[1][i])+"</i>";

                return result;
            }

            $("#info").html(generateFullName());
            
            //next
            $("#next").click(function () {
            
            if (j==0) //niveau des sous-familles
                {
                    level=0; //navigation dans les cinq sous-familles
                    i=(i+1)%5;
                    n1=nam1[i];
                    var suffix="<img src='images/"+tableau[1][i]+".jpg'>";
                    cad.innerHTML=suffix;
                    var caption=tableau[0][i]+": "+tableau[1][i];
                    $("#info").html(generateFullName());
                    if (n1==1)
                        $('.V').css('display', 'none');
                    else
                        $('.V').css('display', 'block');
                }
            else //j est compris entre 1 et n1-1
            {
                    //navigation entre les sous-tribus d'une tribu
                    k=(k+1)%n2; //n2 ne change pas quand on reste dans la même tribu
                    level=2;//le niveau passe de tribu à sous-tribu quand on parcourt la ligne d'images

                    var index=computeIndex(level), name=tableau[index+1][j][k];
                    var caption=tableau[0][i]+": "+tableau[1][i];
                    var suffix="<img src='images/"+name+".jpg'>";
                    cad.innerHTML=suffix;
                    $("#info").html(generateFullName());
            }
            }); // fin de next


            //prev
            $("#prev").click(function () {
            if (j==0)
                {
                    level=0;
                    i=(i+4)%5;2
                    n1=nam1[i];
                    var suffix="<img src='images/"+tableau[1][i]+".jpg'>";
                    cad.innerHTML=suffix;
                    var caption=tableau[0][i]+": "+tableau[1][i];
                    $("#info").html(generateFullName());
                    if (n1==1)
                        $('.V').css('display', 'none');
                    else
                        $('.V').css('display', 'block');
                }
            else //voir "next": c'est la même chose, à l'envers
                {
                        k=(k+n2-1)%n2;
                        level=2;

                        var index=computeIndex(level), name=tableau[index+1][j][k];
                        var suffix="<img src='images/"+name+".jpg'>";
                        cad.innerHTML=suffix;
                        $("#info").html(generateFullName());
                }       
            }); // fin de next

            //down
            $("#down").click(function() {
                //parcourt les tribus d'une famille
                if (n1!=1){ //il n'y a rien à faire pour les sous-familles à une seule tribu
                    j=(j+1)%n1;
                    level=1;//le niveau passe de sous-famille à tribu quand on parcourt la colonne d'images, ou d'une sous-tribu à la tribu voisine
                    n2=nam2[i][j];
                    var index=computeIndex(level), name=tableau[index+1][j];
                    var suffix="<img src='images/"+name+".jpg'>";
                    cad.innerHTML=suffix;
                    $("#info").html(generateFullName());
                }
            });
            //fin de down

            //up
            $("#up").click(function() {
                if (n1!=1){ //voir down, dont c'est l'action inverse
                    j=(j+1)%n1;
                    level=1;
                    n2=nam2[i][j];
                    var index=computeIndex(level), name=tableau[index+1][j];
                    var suffix="<img src='images/"+name+".jpg'>";
                    cad.innerHTML=suffix;
                    $("#info").html(generateFullName());
                }
            });
            //fin d'up

        }); // fin de ready*/
