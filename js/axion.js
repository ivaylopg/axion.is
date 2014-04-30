$(document).ready(function () {

    var headSize = $('.header').height();


    $('#nav').affix({
      offset: {
        top: headSize
      }
    }); 
    

    $(".vidCover").on("play", function(){
        $(this).attr("poster","");
    });

});

