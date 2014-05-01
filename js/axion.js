var s = skrollr.init({
    forceHeight: false,
    smoothScrolling: false,
    constants: {
        blogTop: function() {
            return this.relativeToAbsolute(document.getElementById('blog'), 'top', 'top');
        },
        blogBottom: function() {
            return this.relativeToAbsolute(document.getElementById('blog'), 'top', 'bottom');
        },
        blogHeight: function() {
            var t = this.relativeToAbsolute(document.getElementById('blog'), 'top', 'top');
            var b = this.relativeToAbsolute(document.getElementById('blog'), 'top', 'bottom');
            console.log(b);
            return b - t;
        }
    },
    easing: {
        easeInQuad: function (p) { return p*p },
        easeOutQuad: function (p) { return p*(2-p) },
        easeInOutQuad: function (p) { return p<.5 ? 2*p*p : -1+(4-2*p)*p },
        easeInCubic: function (p) { return p*p*p },
        easeOutCubic: function (p) { return (--p)*p*p+1 },
        easeInOutCubic: function (p) { return p<.5 ? 4*p*p*p : (p-1)*(2*p-2)*(2*p-2)+1 },
        easeInQuart: function (p) { return p*p*p*p },
        easeOutQuart: function (p) { return 1-(--p)*p*p*p },
        easeInOutQuart: function (p) { return p<.5 ? 8*p*p*p*p : 1-8*(--p)*p*p*p },
        easeInQuint: function (p) { return p*p*p*p*p },
        easeOutQuint: function (p) { return 1+(--p)*p*p*p*p },
        easeInOutQuint: function (p) { return p<.5 ? 16*p*p*p*p*p : 1+16*(--p)*p*p*p*p }
    }
});

$("#topNav a").click(function( event ) {
    event.preventDefault();
    var d = $(this).attr('href');
    if (d=="#info") {
        s.animateTo(s.relativeToAbsolute(document.getElementById('info'), 'top', 'top'), {duration: 1500, easing: "easeInOutQuart"});
    } else if (d=="#who") {
        s.animateTo(s.relativeToAbsolute(document.getElementById('who'), 'top', 'top'), {duration: 3000, easing: "easeInOutQuart"});
    } else if (d=="#contact") {
        s.animateTo(s.relativeToAbsolute(document.getElementById('contact'), 'top', 'top'), {duration: 4500, easing: "easeInOutQuart"});
    }
});


$(document).ready(function () {

    var headSize = $('.header').height();
    var whichPic = 1;


    $('#nav').affix({
      offset: {
        top: headSize
      }
    }); 
    

    $(".vidCover").on("play", function(){
        $(this).attr("poster","");
    });

    $(window).scroll(function(){

        var posFromTop = $(window).scrollTop() - s.relativeToAbsolute(document.getElementById('blog'), 'bottom', 'top');
        var totHeight = s.relativeToAbsolute(document.getElementById('blog'), 'top', 'bottom') - s.relativeToAbsolute(document.getElementById('blog'), 'bottom', 'top');

        var maxPics = 29;
        var value = (posFromTop/totHeight) * maxPics;
        var picNo = 1;
        if (Math.ceil(value) <= 0) {
            picNo = 1;
        } else if (Math.ceil(value) > 0 && Math.ceil(value) <= maxPics){
            picNo = Math.ceil(value);
        } else {
            picNo = maxPics;
        }

        if (picNo != whichPic) {
            whichPic = picNo;

            var picSrc = "img/bgseq/" + picNo + ".jpg";
            $('#tunnelImg').attr("src",picSrc);

            //var picSrc = "url(img/bgseq/" + picNo + ".jpg)";
            //$('.slideB').css("background-image",picSrc);
        }
        
        
        
        
        //console.log(picSrc);
        //console.log(picNo);
    });

});

