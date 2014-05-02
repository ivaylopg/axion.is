$(document).ready(function () {


    // we still have to implement preload for the hallway!


    

    /*
    <div class="blogEntry">
      <span class="blogDate">Sat, 26 Apr 2014 14:50:23</span>
      <div class="divider"></div>
      <div class="blogImg"><img src="http:\/\/24.media.tumblr.com\/8e014144038783b82b606bbd6d58d636\/tumblr_n4nizz80xj1qzyep5o1_1280.jpg" ></div>
      <p>@ksiwoff exploring #axion during @tribecafilmins interactive day. #TFIi #Tribeca  (at IAC)</p>
      <p><a href="http:\/\/blog.ivaylogetov.com\/post\/83937239727">permalink</a><a href="http://blog.ivaylogetov.com/tagged/tribeca">#tribeca</a><a href="http://blog.ivaylogetov.com/tagged/axion">#axion</a></p>
      <p><br /><br />&nbsp;</p>
    </div>
    */



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
                //console.log(b);
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


    // Blog Stuff
    if (typeof tumblr_api_read !== 'undefined') {
        var blogData = "";

        for (var i = 0; i < tumblr_api_read.posts.length; i++) {
        //for (var i = 0; i < 1; i++) {
            //console.log(tumblr_api_read.posts[i].date);
            //$("#blogContent").append("<p>" + tumblr_api_read.posts[i].date + "</p>");
            var post = '<div class="blogEntry"><span class="blogDate">' + tumblr_api_read.posts[i]["date"] + '</span><div class="divider"></div>';
            post = post + '<div class="blogImg"><img src="' + tumblr_api_read.posts[i]["photo-url-1280"] + '" /></div>';
            post = post + tumblr_api_read.posts[i]["photo-caption"];

            post = post + '<p><a href="' + tumblr_api_read.posts[i]["url"] + '">permalink</a>';

            if (tumblr_api_read.posts[i]["tags"] !== 'undefined') {
                for (var j = 0; j < tumblr_api_read.posts[i]["tags"].length; j++) {
                    post = post + '<a href="http://axionexperience.tumblr.com/tagged/' + tumblr_api_read.posts[i]["tags"][j] + '">#' + tumblr_api_read.posts[i]["tags"][j] + '</a>';
                };
            }
            post = post + '</p><p><br /><br />&nbsp;</p></div>';
            blogData = blogData + post;
        };
        $("#blogContent").html(blogData);
        var pos = Math.floor($("#blog").offset().top) + "px";
        $("#blogContent").css("top",pos);

    } else {
        console.log("UNDEFINED");
    }



    // start SoundManager
    var clip1;
    var clip2;
    var clip3;

    var sm = soundManager.setup({
      url: '../swf/',
      preferFlash: false,
      waitForWindowLoad: true,
      onready: function() {
        clip1 = soundManager.createSound({
          id: 'aSound',
          url: 'audio/walking.mp3',
          multiShot: false,
          onfinish: function() {
            playDrawer(1,0);
            togglePlayPause("#clip1",true);
          },
          whileplaying: function() {
            if(this.readyState==3) {
                var prog = (this.position / this.duration) * 100;
                playDrawer(1,prog);
            }
          }
        });

        clip2 = soundManager.createSound({
          id: 'bSound',
          url: 'audio/rain.mp3',
          multiShot: false,
          onfinish: function() {
            playDrawer(2,0);
            togglePlayPause("#clip2",true);
          },
          whileplaying: function() {
            if(this.readyState==3) {
                var prog = (this.position / this.duration) * 100;
                playDrawer(2,prog);
            }
          }
        });

        clip3 = soundManager.createSound({
          id: 'cSound',
          url: 'audio/going_outside.mp3',
          multiShot: false,
          onfinish: function() {
            playDrawer(3,0);
            togglePlayPause("#clip3",true);
          },
          whileplaying: function() {
            if(this.readyState==3) {
                var prog = (this.position / this.duration) * 100;
                playDrawer(3,prog);
            }
          }
        });

        clip4 = soundManager.createSound({
          id: 'dSound',
          url: 'audio/bass.mp3',
          multiShot: false,
          onfinish: function() {
            playDrawer(4,0);
            togglePlayPause("#clip4",true);
          },
          whileplaying: function() {
            if(this.readyState==3) {
                var prog = (this.position / this.duration) * 100;
                playDrawer(4,prog);
            }
          }
        });
        clip1.load();
        clip2.load();
        clip3.load();
        clip4.load();
        $('.quote').css("padding","2% 10% 2% 20%");
        $('.quotePlay').css("visibility","visible");
      },
      ontimeout: function() {
        $('.quote').css("padding","2% 10% 2% 10%");
        $('.quotePlay').css("visibility","hidden");
      }
    });

    $(".playbutton").click( function() {
        var w = $(this).attr('id');
        //console.log(w);

        switch (w) {
            case "clip1":
                if(clip1.playState != 1) {
                    clip1.play();    
                } else {
                    clip1.togglePause();
                }
                togglePlayPause("#"+w,clip1.paused);
                break;
            case "clip2":
                if(clip2.playState != 1) {
                    clip2.play();    
                } else {
                    clip2.togglePause();
                }
                togglePlayPause("#"+w,clip2.paused);
                break;
            case "clip3":
                if(clip3.playState != 1) {
                    clip3.play();    
                } else {
                    clip3.togglePause();
                }
                togglePlayPause("#"+w,clip3.paused);
                break;
            case "clip4":
                if(clip4.playState != 1) {
                    clip4.play();    
                } else {
                    clip4.togglePause();
                }
                togglePlayPause("#"+w,clip4.paused);
                break;
        }
    });

    //$( "p" ).removeClass( "myClass noClass" ).addClass( "yourClass" );

    $(".dial").knob({
                'readOnly':true,
                'displayInput':false,
                'thickness':0.2,
                'fgColor':'#444444',
                'bgColor':'#CCCCCC'
                });


    function playDrawer(id, pc) {
        //console.log(pc);
        switch (id){
            case 1:
                $('#dial1')
                    .val(pc)
                    .trigger('change');
                break;
            case 2:
                $('#dial2')
                    .val(pc)
                    .trigger('change');
                break;
            case 3:
                $('#dial3')
                    .val(pc)
                    .trigger('change');
                break;
            case 4:
                $('#dial4')
                    .val(pc)
                    .trigger('change');
                break;
        }
    }

    function togglePlayPause(id,state) {
        if (state == false) {
            $(id).removeClass( "glyphicon-play" ).addClass( "glyphicon-pause" );
        } else {
            $(id).removeClass( "glyphicon-pause" ).addClass( "glyphicon-play" );
        }
    }





    // keep track of which hallway image is active
    var whichPic = 1;

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
    $("#topNav a").click(function( event ) {
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

    // This is the hallway animation
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

            //console.log(picSrc);
            //console.log(picNo);
        }
    });

    $(window).resize(function(){
        var pos = Math.floor($("#blog").offset().top) + "px";
        $("#blogContent").css("top",pos);
    });

    
    

});

