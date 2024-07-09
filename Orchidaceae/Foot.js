$(document).ready(function(){
      $(document).mousemove(function(event){
        // Position actuelle de la souris par rapport au bas de la fenêtre
        var mouseY = event.clientY, mouseX=event.clientX;
        var windowHeight = $(window).height();

        console.log(mouseY);

        // Si la souris est proche du bas de la fenêtre
        if(mouseY + window.scrollY> windowHeight - 150) {

          // Faites glisser l'élément vers le haut
          $("#quiz").css("bottom", "30px");
          $("#quiz").css("left", mouseX-30);
        } else {
          // Réinitialiser la position de l'élément
          $("#quiz").css("bottom", "-200px");
        }
      });
});