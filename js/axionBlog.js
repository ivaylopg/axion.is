$(document).ready(function () {


    // [x] We still have to implement preload for the hallway!
    // [x] Add video and text posts for the blog
    // [ ] Tumblr version of page
    // [ ] Gif replacement of video
    // [x] Stop video play when not visible
    // [ ] buttons/logos over video
    // [x] add correct quotes
    // [x] add footer to blog
    // [ ] get rid of unused fonts
    // [ ] add licence and credits to code
    // [x] add legal footer to site
    // [x] footer images
    // [x] link to github
    // [x] mailchimp
    // [x] fix press links
    // [x] update axion blog
    // [x] add non-blog mode and set as default.
    // [x] add paralax to screening/press section
    // [x] side Nav
    // [ ] social media links?
    // [ ] narrower BG images
    // [ ] clean up all code!


    // start skrollr
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

    


    var qt1 = Math.floor((Math.random() * 2) + 1);
    var qt2 = Math.floor((Math.random() * 2) + 1);

    if (qt1 == 2) {
        //$('#qc1').html("<p>We are at a stage where, as experimentalists, we are a bit lost because there is not a real theory out there which says, 'you should look in this direction.' We are looking. I am looking in the dark.</p><footer>Professor Elena Aprile</footer>")
        $('#qc1').html("<p>We have all reasons to believe that dark matter is real... If dark matter is a particle, it is its own anti-particle, so it's matter and antimatter at the same time. As two galaxies collide, the ordinary matter actually collides, and you see the other component, the one that interacts so little, just passing through each other...like the other one wasn't there.</p><footer>Professor Martin Pohl</footer>");
    };

    if (qt2 == 2) {
        $('#qc2').html("<p>I mean, I've come to the view myself where Theoretical Physics is almost a sort of, kind of wierd representational art form. In the sense that this gets to the heart of what Theoretical Physics does today faster than telling someone you're a 'scientist.'</p><footer>Dr. Mark Wyman</footer>");
    };


    // once video is loaded and playing, get rid of poster frame to eliminate stutter on loop
    $(".vidCover").on("play", function(){
        $(this).attr("poster","");
    });

    // get rid of status bar for the initial navigation links (becasue they're so close to the bottom it gets in the way)
    $("#topNav a").each(function() {
        $(this).removeAttr("href");
        $(this).css("cursor","pointer");
    });

    // animate scrolling for navigation links
    $("#topNav a, #fixedNav a").click(function( event ) {
        event.preventDefault();
        var scrollTime = ($("#blog").outerHeight() / $("#info").outerHeight()) + 4500;
        //var d = $(this).attr('href');
        var d = "#" + $(this).attr('data-target');
        //console.log(d);

        if (d=="#info") {
            s.animateTo(s.relativeToAbsolute(document.getElementById('info'), 'top', 'top'), {duration: 1500, easing: "easeInOutQuart"});
        } else if (d=="#who") {
            s.animateTo(s.relativeToAbsolute(document.getElementById('who'), 'top', 'top'), {duration: 3000, easing: "easeInOutQuart"});
        } else if (d=="#blog") {
            s.animateTo(s.relativeToAbsolute(document.getElementById('blog'), 'top', 'top'), {duration: 4500, easing: "easeInOutQuart"});
        } else if (d=="#contact") {
            s.animateTo(s.relativeToAbsolute(document.getElementById('contact'), 'top', 'top'), {duration: scrollTime, easing: "easeInOutQuart"});
        }
    }); 

    $("#topNav a").hover(
      function() {
        var labelTxt = $(this).attr('data-label');
        $(".navLabel").html(labelTxt);
        $(".navLabel").css({"visibility":"visible","opacity":"1"});
      }, function() {
        $(".navLabel").css({"opacity":"0","visibility":"hidden"});
        $(".navLabel").html(" ");
      }
    );


    // keep track of which hallway image is active
    var whichPic = 1;
    var howManyPics =29;

    // This is the hallway animation
    $(window).scroll(function(){

        var posFromTop = $(window).scrollTop() - s.relativeToAbsolute(document.getElementById('blog'), 'bottom', 'top');
        var totHeight = s.relativeToAbsolute(document.getElementById('blog'), 'top', 'bottom') - s.relativeToAbsolute(document.getElementById('blog'), 'bottom', 'top');

        var maxPics = howManyPics;
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

            
            

            /*
            // LOCAL
            var picSrc = "img/bgseq/" + picNo + ".jpg";
            var doesExist = $("#plImg1" + picNo ).attr('data-loaded');
            
            if (doesExist == "loaded") {
                $('#tunnelImg').attr("src",picSrc);
            };

            */

            
            // REMOTE
            var picSrc = "http://www.ivaylogetov.com/axionblog/img/bgseq/" + picNo + ".jpg";
            $('#tunnelImg').attr("src",picSrc);
        }


        if ($(window).scrollTop() > s.relativeToAbsolute(document.getElementById('underVideo'), 'top', 'top')) {
        //if ($(window).scrollTop() > 100) {
            document.getElementById('topVid').pause();
        } else {
            document.getElementById('topVid').play();
        };
    });


    // Global functions and events

    function blogDate(dString) {
        var month = "";
        var numDay =""; 
        if (dString.charAt(5) == 0) {
            numDay = String(dString.charAt(6))
        } else {
            numDay = String(dString.charAt(5)) + String(dString.charAt(6))
        };
        var year = dString.charAt(12) + dString.charAt(13) + dString.charAt(14) + dString.charAt(15);
        var mon = dString.charAt(8) + dString.charAt(9) + dString.charAt(10);
        switch(mon) {
            case "Jan":
                month = "January";
                break;
            case "Feb":
                month = "February";
                break
            case "Mar":
                month = "March";
                break
            case "Apr":
                month = "April";
                break
            case "May":
                month = "May";
                break
            case "Jun":
                month = "June";
                break
            case "Jul":
                month = "July";
                break
            case "Aug":
                month = "August";
                break
            case "Sep":
                month = "September";
                break
            case "Oct":
                month = "October";
                break
            case "Nov":
                month = "November";
                break
            case "Dec":
                month = "December";
                break
            default:
                month = mon;
        }
        var outDate = month + " " + numDay + ", " + year;
        return outDate;
    }

    $(window).resize(function(){
        //var pos = Math.floor($("#blog").offset().top) + "px";
        //$("#blogContent").css("top",pos);
        //var hh = $("#blogContent").height();
        //console.log(hh);
    });

    $(window).load(function(){
        //s.refresh();
        s.refresh($("#blog"));

        /*
        // LOCAL
        for (var i = 1; i < howManyPics+1; i++) {
            $('<img />')
                //.attr({'src': 'img/bgseq/' + i + '.jpg','width':'2px','height':'auto','data-loaded':'loaded','id':'plImg' + i})
                .attr({'src': 'img/bgseq/' + i + '.jpg','width':'2px','height':'auto','data-loaded':'loaded','id':'plImg' + i})
                .load(function(){
                    $('#preloadHolder').append( $(this) );
                });
        };
        */

        
        // REMOTE
        for (var i = 1; i <= howManyPics; i++) {

            var bImage = new Image();
            bImage.src = "http://www.ivaylogetov.com/axionblog/img/bgseq/" + i + ".jpg";

        };
        
    })


    

});

