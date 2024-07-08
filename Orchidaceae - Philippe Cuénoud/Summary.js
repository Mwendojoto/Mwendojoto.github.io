const urlParams = new URLSearchParams(window.location.search);
    var result = urlParams.get('result'), score = urlParams.get('score');
    document.querySelector("#score").innerHTML += score+"/8";
    document.querySelector("#answers").innerHTML += result;
    document.querySelector()

    function recupererValeur() {

        event.preventDefault();

            var prenom = document.getElementById('name').value;
            var nom = document.getElementById('lame').value;
            var email = document.getElementById('email').value;
        
        if ((prenom.length<1)||(nom.length<1)||(email.length<1))
            alert("L'un des champs au moins est vide");
        else if (email.indexOf("@")<1)
            alert("Adresse email non valide");
        else
            document.querySelector("#nullable").style.display = 'none';
    }