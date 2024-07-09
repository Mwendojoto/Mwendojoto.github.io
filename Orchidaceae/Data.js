function display() { //
    var x=document.querySelector("#links");
    if (x.style.display === "grid") {
        x.style.display = "none";
      } else {
        x.style.display = "grid";
    }  
}

var subs=["Apostasioideae","Vanilloideae","Cypripedioideae","Orchidoideae","Epidendroideae"];

var subfamilies=[["Apostasioideae","Apostasieae"],["Vanilloideae","Pogonieae"],["Vanilloideae","Vanilleae"],["Cypripedioideae","Cypripedieae"],
["Orchidoideae","Orchideae"],["Orchidoideae","Codonorchideae"],["Orchidoideae","Diurideae"],["Orchidoideae","Cranichideae"],["Epidendroideae","Epidendrae"],
["Epidendroideae","Collabieae"],["Epidendroideae","Podochileae"],["Epidendroideae","Vandeae"],["Epidendroideae","Cymbidieae"],["Epidendroideae","Malaxidae"],
["Epidendroideae","Arethusae"],["Epidendroideae","Thaieae"],["Epidendroideae","Nervilieae"],["Epidendroideae","Gastrodieae"],["Epidendroideae","Xerorchideae"],
["Epidendroideae","Triphoreae"],["Epidendroideae","Wullschlaegelieae"],["Epidendroideae","Tropidieae"],["Epidendroideae","Sobralieae"],["Epidendroideae","Neottieae"]];

var tribes=[["Apostasieae","Apostasiinae"],["Pogonieae","Pogoniinae"],["Vanilleae","Vanilliinae"],["Cypripedieae","Cypripediinae"],
["Orchideae","Coryciinae"],["Orchideae","Disinae"],["Orchideae","Orchidinae"],["Orchideae","Brownleeinae"],["Codonorchideae","Codonorchinae"],
["Diurideae","Thelymitrinae"],["Diurideae","Megastylidinae"],["Diurideae","Drakaeinae"],["Diurideae","Cryptostylidinae"],["Diurideae","Diuridinae"],
["Diurideae","Prasophyllinae"],["Diurideae","Caladeniinae"],["Diurideae","Acianthinae"],["Diurideae","Rhizanthellinae"],["Cranichideae","Chloraeinae"],
["Cranichideae","Pterostylidinae"],["Cranichideae","Goodyerinae"],["Cranichideae","Galeottiellinae"],["Cranichideae","Manniellinae"],
["Cranichideae","Spiranthinae"],["Cranichideae","Discyphinae"],["Cranichideae","Cranichidinae"],["Epidendrae","Laeliinae"],["Epidendrae","Pleurothallidinae"],
["Epidendrae","Ponerinae"],["Epidendrae","Bletiinae"],["Epidendrae","Calypsoinae"],["Epidendrae","Agrostophyllinae"],["Collabieae","Collabiinae"],
["Podochileae","Podochilinae"],["Vandeae","Angraecinae"],["Vandeae","Aeridinae"],["Vandeae","Adrorhizinae"],["Vandeae","Polystachyinae"],
["Cymbidieae","Cymbidiinae"],["Cymbidieae","Cyrtopodiinae"],["Cymbidieae","Stanhopeinae"],["Cymbidieae","Coeliopsidinae"],["Cymbidieae","Maxillariinae"],
["Cymbidieae","Eriopsidinae"],["Cymbidieae","Zygopetalinae"],["Cymbidieae","Oncidiinae"],["Cymbidieae","Catasetinae"],["Cymbidieae","Eulophiinae"],
["Malaxidae","Dendrobiinae"],["Malaxidae","Malaxidinae"],["Arethusae","Coelogyninae"],["Arethusae","Arethusinae"],["Thaieae","Thainae"],
["Nervilieae","Nerviliinae"],["Nervilieae","Epipogiinae"],["Gastrodieae","Gastrodiinae"],["Xerorchideae","Xerorchidiinae"],["Triphoreae","Triphorinae"],
["Triphoreae","Diceratostelinae"],["Wullschlaegelieae","Wullschlaegeliinae"],["Tropidieae","Tropidiinae"],["Sobralieae","Sobraliinae"],["Neottieae","Neottiinae"]];

var examples=[["Apostasiinae","Apostasia wallichii"],["Pogoniinae","Pogonia ophioglossoides"],["Vanilliinae","Vanilla mexicana"],
["Cypripediinae","Paphiopedilum insigne"],["Cypripediinae","Cypripedium calceolus"],["Coryciinae","Corycium orobanchoides"],["Disinae","Disa uniflora"],
["Orchidinae","Orchis militaris"],["Brownleeinae","Brownleea parviflora"],["Codonorchinae","Codonorchis lessonii"],["Thelymitrinae","Thelymitra longifolia"],
["Thelymitrinae","Calochilus campestris"],["Megastylidinae","Megastylis gigas"],["Drakaeinae","Drakaea glyptodon"],["Cryptostylidinae","Cryptostylis erecta"],
["Diuridinae","Diuris aurea"],["Prasophyllinae","Prasophyllum australe"],["Caladeniinae","Caladenia carnea"],["Acianthinae","Acianthus exsertus"],
["Acianthinae","Corybas aconitiflorus"],["Acianthinae","Cyrtostylis reniformis"],["Rhizanthellinae","Rhizanthella gardneri"],["Chloraeinae","Chloraea gavilu"],
["Pterostylidinae","Pterostylis curta"],["Goodyerinae","Goodyera repens"],["Galeottiellinae","Galeottiella sarcoglossa"],["Manniellinae","Manniella gustavi"],
["Spiranthinae","Spiranthes spiralis"],["Discyphinae","Discyphus scopulariae"],["Cranichidinae","Cranichis muscosa"],["Laeliinae","Laelia speciosa"],
["Laeliinae","Brassavola cucullata"],["Pleurothallidinae","Pleurothallis lamellaris"],["Ponerinae","Ponera juncifolia"],["Bletiinae","Bletia catenulata"],
["Calypsoinae","Calypso bulbosa"],["Calypsoinae","Corallorhiza trifida"],["Agrostophyllinae","Agrostophyllum philippinense"],["Collabiinae","Collabium formosanum"],
["Collabiinae","Calanthe triplicata"],["Podochilinae","Podochilus australiensis"],["Angraecinae","Angraecum eburneum"],["Aeridinae","Aerides odorata"],
["Adrorhizinae","Adrorhizon purpurascens"],["Polystachyinae","Polystachya concreta"],["Cymbidiinae","Cymbidium aloifolium"],["Cyrtopodiinae","Cyrtopodium andersonii"],
["Stanhopeinae","Gongora quinquenervis"],["Stanhopeinae","Stanhopea insignis"],["Coeliopsidinae","Coeliopsis hyacinthosma"],["Maxillariinae","Maxillaria longipetala"],
["Eriopsidinae","Eriopsis biloba"],["Zygopetalinae","Zygopetalum maculatum"],["Oncidiinae","Oncidium altissimum"],["Oncidiinae","Erycina pusilla"],
["Catasetinae","Catasetum macrocarpum"],["Catasetinae","Mormodes cartonii"],["Eulophiinae","Eulophia guineensis"],["Dendrobiinae","Dendrobium moniliforme"],["Dendrobiinae","Bulbophyllum falcatum"],
["Malaxidinae","Liparis loeselii"],["Malaxidinae","Oberonia mucronata"],["Coelogyninae","Bletilla striata"],["Coelogyninae","Coelogyne cristata"],
["Arethusinae","Arethusa bulbosa"],["Arethusinae","Arundina graminifolia"],["Arethusinae","Calopogon tuberosus"],["Thainae","Thaia saprophytica"],
["Nerviliinae","Nervilia concolor"],["Epipogiinae","Epipogium aphyllum"],["Gastrodiinae","Gastrodia sesamoides"],["Xerorchidiinae","Xerorchis amazonica"],
["Triphorinae","Triphora trianthophoros"],["Diceratostelinae","Diceratostele gabonensis"],["Wullschlaegeliinae","Wullschlaegelia aphylla"],
["Tropidiinae","Tropidia curculigoides"],["Sobraliinae","Sobralia decora"],["Neottiinae","Neottia nidus-avis"]];

var SFamiliesJSON= [
    '{"Name":"Apostasioideae", "Introduction" : "La sous-famille des Apostasioideae est généralement considérée comme la sous-famille la plus primitive des Orchidées.", "Diversity" : "Les Apostasioideae sont composés de deux genres avec quinze espèces.", "Geography" : "Les Apostasioideae se rencontrent dans les forêts tropicales humides d\'Asie et du Pacifique.","Characteristics" : "Les Apostasioideae sont terrestres, avec des fleurs à trois étamines, comme fréquemment chez les familles voisines, mais pas chez les autres Orchidées."}',

    '{"Name" : "Vanilloideae", "Introduction" : "La sous-famille des Vanilloideae est composée d\'Orchidées terrestres ou grimpantes.", "Diversity" : "Les Vanilloideae sont composés de quinze genres avec cent-quatre-vingt espèces.", "Geography" : "Les Vanilloideae se rencontrent dans les forêts tropicales de tous les continents.", "Characteristics" : " Les Vanilloideae sont terrestres ou grimpants, avec des fleurs à deux étamines."}', 

    '{"Name" : "Cypripedioideae", "Introduction" : "La sous-famille des Cypripedioideae est caractérisée par son pétale central (labelle) en forme de sabot.", "Diversity" : "Les Cypripedioideae sont composés de cinq genres avec cent-soixante-cinq espèces.", "Geography" : "Les Cypripedioideae se rencontrent dans les forêts tropicales d\'Amérique et d\'Asie, en Afrique du Nord et dans les régions tempérées d\'Europe, d\'Asie et d\'Amérique du Nord.", "Characteristics" : "Les Cypripedioideae sont terrestres, avec des fleurs à deux étamines, dont le pétale principal (labelle) est en forme de poche où tombent les insectes qui pollinisent les fleurs en ressortant et en se frottant aux étamines."}',
        
    '{"Name" : "Orchidoideae", "Introduction" : "La sous-famille des Orchidoideae est composée d\'espèces terrestres particulièrement diverses dans les régions tempérées.", "Diversity" : "Les Orchidoideae sont composés de deux-cent-cinquante-deux genres avec plus de trois-mille-six-cent espèces.", "Geography" : "Les Orchidoideae se rencontrent principalement dans les régions tempérées des deux hémisphères.", "Characteristics" : " Les Orchidoideae sont terrestres, avec des fleurs à une étamine, dont le pétale principal (labelle) est parfois modifié pour imiter les femelles de certains insectes, et ainsi en attirer les mâles."}',
    '{"Name" : "Epidendroideae", "Introduction" : "La sous-famille des Epidendroidae (littéralement «sur les arbres») est composée d\'espèces terrestres ou épiphytes (poussant sur les branches des arbres), particulièrement diverses dans les régions tropicales.", "Diversity" : "Les Epidendroideae sont composés de près de six-cent genres, avec plus de vingt-mille espèces.", "Geography" : "Les Epidendroideae se rencontrent dans le monde entier, avec une diversité maximale dans les régions tropicales humides.", "Characteristics" : "Les Epidendroidae sont terrestres ou épiphytes, avec des fleurs à une étamine, et souvent la présence de pseudo-bulbes (des épaississements de la tige servant à l\'accumulation de réserves d\'eau et d\'amidon)."}'
];