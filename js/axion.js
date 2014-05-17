$(document).ready(function () {


    // [x] We still have to implement preload for the hallway!
    // [x] Add video and text posts for the blog
    // [x] Tumblr version of page
    // [ ] Gif replacement of video
    // [x] Stop video play when not visible
    // [ ] buttons/logos over video
    // [x] add correct quotes
    // [x] add footer to blog
    // [x] get rid of unused fonts
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
    // [x] make sure you are using mini versions of all js
    // [ ] scroll-to speed as a function of where you are on the page....
    // [x] optimize for iphone
    // [ ] add "reblogged from" to site preview?

    
    var isMobile = false;
    var uA = navigator.userAgent;

    if (jQuery.browser.mobile == true) {
        isMobile = true;
    };

    if (uA.indexOf("iPad") > 0 || uA.indexOf("ipad") > 0 || uA.indexOf("iPhone") > 0 || uA.indexOf("iphone") > 0 || uA.indexOf("Mobile") > 0 || uA.indexOf("mobile") > 0 || uA.indexOf("droid") > 0) {
        //console.log("HIT");
        isMobile = true;
    };

    if (isMobile == true) {
        $("#topVid").css({"width":"1px","height":"1px"});
        $("#topVid").remove();
    } else if (uA.indexOf("Safari") > 0 && uA.indexOf("Chrome") < 0) {
        $(".header").css("z-index","-1");
        $(".slideB").css("padding-top","5%");
        $("#mediaInfo").css("top","10%");
        $("#who .w").css("font-weight","300");
        $("#tunnelImg").css("height","100%");
        $("#tunnel").css({"height":"100%","opacity":"0.2"});
    } else {
        /*
        $.getScript("js/skrollr.min.js")
          .done(function( script, textStatus ) {
            console.log( textStatus );
            startSkrollr();
          })
          .fail(function( jqxhr, settings, exception ) {
            console.log( exception );
        });
        */
        startSkrollr();
    };

    

    var s;
    var sActive;

    function startSkrollr(){
        if (isMobile == false) {
            // start skrollr
            s = skrollr.init({
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
            sActive = true;
        };
    };
    



    // Render Blog Posts
    if (typeof tumblr_api_read !== 'undefined') {
        var blogData = "";
        var postCount = 0;
        var maxPosts = 3;

        if (uA.indexOf("iPhone") > 0 || uA.indexOf("iphone") > 0) {
            maxPosts = 2;
        } else if (isMobile == true) {
            maxPosts = 1;
        };

        for (var i = 0; i < tumblr_api_read.posts.length; i++) {

            if (postCount < maxPosts) {
                var kind = tumblr_api_read.posts[i]["type"];

                if (kind == "photo" || kind == "video" || kind == "regular") {
                    var formatDate = blogDate(tumblr_api_read.posts[i]["date"]);

                    var post = '<div class="blogEntry"><span class="blogDate"><a href="' + tumblr_api_read.posts[i]["url"] + '"target="_blank">' + formatDate + '</a></span><div class="divider"></div>';
                    
                    // Photo Post //
                    if (kind == "photo") {
                        post = post + '<div class="blogImg"><img src="' + tumblr_api_read.posts[i]["photo-url-1280"] + '" /></div>';
                        post = post + tumblr_api_read.posts[i]["photo-caption"];
                    }
                    ////////////////

                    // Video Post //
                    if (kind == "video") {
                        post = post + '<div class="blogVid">' + tumblr_api_read.posts[i]["video-player-500"] + '</div>';
                        post = post + tumblr_api_read.posts[i]["video-caption"];
                    }
                    ////////////////

                    // Text Post //
                    if (kind == "regular") {
                        post = post + "<p><br /> &nbsp;</p>"
                        post = post + tumblr_api_read.posts[i]["regular-body"];
                    }
                    ////////////////

                    post = post + '<p>';
                    if (tumblr_api_read.posts[i]["tags"] !== 'undefined') {
                        for (var j = 0; j < tumblr_api_read.posts[i]["tags"].length; j++) {
                            post = post + '<a href="http://axionexperience.tumblr.com/tagged/' + tumblr_api_read.posts[i]["tags"][j] + '" target="_blank" class="hash">#' + tumblr_api_read.posts[i]["tags"][j] + '</a>';
                        };
                    }
                    post = post + '</p><p><br /><br />&nbsp;</p></div>';

                    blogData = blogData + post;
                    postCount++;
                };
            };              
        };
        // Create the blog posts
        if (postCount >= 1) {

            blogData = blogData + '<div class="blogEntry"><div class="divider"></div><p><br />&nbsp;</p>'
            blogData = blogData + '<span class="blogFoot">See more updates on our <a href="http://axionexperience.tumblr.com/"target="_blank">tumblr</a></span></div>';

            $("#blogContent").html(blogData);

            $(".blogVid").each(function() {
                $(this).fitVids();
            });

            $("#blogContent").css("visibility","visible");

            $("#mediaInfo").css({
              "width": "auto",
              "left": "58%"
            });

            if (isMobile == true) {
                $(".slideB").css("padding-top","5%");
                $("#mediaInfo").css("top","10%");
            }

            $("#mediaInfo").attr({
              "data-top-top": "top: 2%;",
              "data-bottom-bottom": "top: 60%;",
              "data-anchor-target": "#blog"
            });

            // Probably don't need this here:
            if (isMobile == false && sActive == true) {
                s.refresh();
                s.refresh($("#blog"));
            }
        };
        
    } else {
        console.log("UNDEFINED");
    }

    // start SoundManager
    var clip1;
    var clip2;
    var clip3;
    var clip4;
    var sm;

if (isMobile == false) {

    sm = soundManager.setup({
      url: '../swf/',
      preferFlash: false,
      waitForWindowLoad: true,
      onready: function() {
        clip1 = soundManager.createSound({
          id: 'aSound',
          url: 'audio/q1.mp3',
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
          url: 'audio/q2.mp3',
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
          url: 'audio/q3.mp3',
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
          url: 'audio/q4.mp3',
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
        if (isMobile == false) {
            $('.quote').css("padding","2% 10% 2% 20%");
            $('.quotePlay').css("visibility","visible");
        };
      },
      ontimeout: function() {
        $('.quote').css("padding","2% 10% 2% 10%");
        $('.quotePlay').css("visibility","hidden");
      }
    });

};

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



    // once video is loaded and playing, get rid of poster frame to eliminate stutter on loop
    $(".vidCover").on("play", function(){
        $(this).attr("poster","");
    });


    
    if (isMobile == false) {
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
    };

    

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
        if (isMobile == false) {
        
            var posFromTop;
            var totHeight;

            if (sActive == true) {
                posFromTop = $(window).scrollTop() - s.relativeToAbsolute(document.getElementById('blog'), 'bottom', 'top');
                totHeight = s.relativeToAbsolute(document.getElementById('blog'), 'top', 'bottom') - s.relativeToAbsolute(document.getElementById('blog'), 'bottom', 'top');
            } else {
                posFromTop = 1;
                totHeight = 1;
            };

            //console.log(sActive);

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
                var picSrc = "img/bgseq/" + picNo + ".jpg";
                $('#tunnelImg').attr("src",picSrc);
            }


            if (sActive == true) {
                if ($(window).scrollTop() > s.relativeToAbsolute(document.getElementById('underVideo'), 'top', 'top')) {
                    document.getElementById('topVid').pause();
                } else {
                    document.getElementById('topVid').play();
                };
            } else {
                if ($(window).scrollTop() > $("#topVid").height()) {
                    document.getElementById('topVid').pause();
                } else {
                    document.getElementById('topVid').play();
                };
            };
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
        //console.log(window.innerHeight);
        var winH = window.innerHeight;
        var off3 = winH/1.78;
        var off2 = winH/3.57;
        var off1 = -1 * off3;

        $(".bgHolder").each(function() {
            //console.log(off1 + " | " + off2 + " | " + off3);

            $(this).attr({
              "data-bottom-top": "transform: translateY(" + off1 + "px); -ms-transform: translateY(" + off1 + "px); -webkit-transform: translateY(" + off1 + "px);",
              "data-top-top": "transform: translateY(0px); -ms-transform: translateY(0px); -webkit-transform: translateY(0px);",
              "data-center-bottom": "transform: translateY(" + off2 + "px); -ms-transform: translateY(" + off2 + "px); -webkit-transform: translateY(" + off2 + "px);",
              "data-top-bottom": "transform: translateY(" + off3 + "px); -ms-transform: translateY(" + off3 + "px); -webkit-transform: translateY(" + off3 + "px);"
            });

        });

        if (isMobile == false) {
            s.refresh();
            //s.refresh($("#blog"));
        }
    });

    $(window).load(function(){
        //s.refresh();

        var winH = window.innerHeight;
        var off3 = winH/1.78;
        var off2 = winH/3.57;
        var off1 = -1 * off3;

        $(".bgHolder").each(function() {
            //console.log(off1 + " | " + off2 + " | " + off3);

            
            $(this).attr({
              "data-bottom-top": "transform: translateY(" + off1 + "px); -ms-transform: translateY(" + off1 + "px); -webkit-transform: translateY(" + off1 + "px);",
              "data-top-top": "transform: translateY(0px); -ms-transform: translateY(0px); -webkit-transform: translateY(0px);",
              "data-center-bottom": "transform: translateY(" + off2 + "px); -ms-transform: translateY(" + off2 + "px); -webkit-transform: translateY(" + off2 + "px);",
              "data-top-bottom": "transform: translateY(" + off3 + "px); -ms-transform: translateY(" + off3 + "px); -webkit-transform: translateY(" + off3 + "px);"
            });

            /*
            data-bottom-top="transform: translateY(-700px); -ms-transform: translateY(-700px); -webkit-transform: translateY(-700px);" 
            data-top-top="transform: translateY(0px); -ms-transform: translateY(0px); -webkit-transform: translateY(0px);"  
            data-center-bottom="transform: translateY(350px); -ms-transform: translateY(350px); -webkit-transform: translateY(350px);" 
            data-top-bottom="transform: translateY(700px); -ms-transform: translateY(700px); -webkit-transform: translateY(700px);"
            */

        });

        if (isMobile == false) {
            s.refresh();
            //s.refresh($("#blog"));
        }

        for (var i = 1; i <= howManyPics; i++) {
            var bImage = new Image();
            bImage.src = "img/bgseq/" + i + ".jpg";

        };
        
        
    })


    

});

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


//console.log(isMobile);
//console.log(navigator.userAgent);
//console.log(navigator.vendor);
