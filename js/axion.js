var s = skrollr.init({
    forceHeight: false,
    smoothScrolling: false
});

$("#topNav a").click(function( event ) {
    event.preventDefault();
    var d = $(this).attr('href');
    if (d=="#info") {
        s.animateTo(s.relativeToAbsolute(document.getElementById('info'), 'top', 'top'), {duration: 1500, easing: "swing"});
    }
});


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

