/**
 * transition end event listener
 *
 */

var transEndEventNames = {
  "WebkitTransition" : "webkitTransitionEnd",
  "MozTransition"    : "transitionend",
  "OTransition"      : "oTransitionEnd",
  "msTransition"     : "MSTransitionEnd",
  "transition"       : "transitionend"
},
transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

/**
 * animation iteration event listener
 *
 */

var animIterationEventNames = {
  "WebkitAnimation" : "webkitAnimationIteration",
  "MozAnimation"    : "animationiteration",
  "OAnimation"      : "oAnimationIteration",
  "msAnimation"     : "MSAnimationIteration",
  "animation"       : "animationiteration"
},
animIterationEventName = animIterationEventNames[ Modernizr.prefixed('animation') ];
// document.querySelector("#el").addEventListener( animIterationEventName, function() {
//   // code here runs after each animation iteration of #el
// });

/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
 */

var PS = {};

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return {
        width: x,
        height: y
    };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
 */
var waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

PS.env = {
    touch: $('html').hasClass('touch') ? true : false
};

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;

$(window).on('resize', function(){
    waitForFinalEvent(function(){
      $(window).trigger('resize-done');
      //...
    }, 500, "some unique string");
});

$(function(){
    $('#loader').css({backgroundImage: 'url('+ templateUrl +'/library/images/PublicSchool_B.2.gif?'+ Math.floor(Date.now() / 1000) +')'});
});


setTimeout(function(){
    $('#loader').css({
        opacity: 0
    });
}, 2400);

var loader = document.getElementById("loader");
loader.addEventListener( transEndEventName, function() {
    console.log('done transitioing');
    $('#loader').trigger('faded-out');
}, false);

$(function(){
    $('#header-logo .gif').attr('src', $('#header-logo .gif').data('src') + '?' + Math.floor(Date.now() / 1000)).show();
});
;var PS = PS || {};

(function($) {
    PS.Highlighter = {
        init: function() {
            this.mobile = WURFL.is_mobile;
            this.$paper = $('.paper');
            this.$paperWrap = $('.paper-wrap');
            this.$hlToolbar = $('.highlighter-sessions-toolbar');
            this.$win = $(window);

            this.winHeight = this.$win.outerHeight();
            this.hlToolbarHeight = this.$hlToolbar.outerHeight();

            this.paperHeight = null;

            this.bindEvents();
            this.initPaper();

            if (Waypoint.viewportWidth() >= 768) {
                this.runExample();
            }
        },
        bindEvents: function() {
            var _this = this;

            if (WURFL.is_mobile) {
                $('mark').click(function() {
                    if ($(this).is('.show-phrase')) {
                        _this.resetPhrase(this);
                    } else {
                        _this.showPhrase(this);
                    }
                });
            } else {
                $('mark').hover(function() {
                    _this.showPhrase(this);
                }, function() {
                    if($(this).data('gif') === 'engineers'){
                        var phrase = this;
                        setTimeout(function(){
                            $('#bones-stylesheet-css')[0].disabled = false;
                            _this.resetPhrase(phrase);
                        }, 2000);
                    } else {
                        _this.resetPhrase(this);
                    }
                });
            }

            $('.menu-btn .info, .close-menu').click(function() {
                console.log(window.innerHeight);

                if ($('body').is('.mobile-menu-open')) {
                    _this.closeMobileMenu();
                } else {
                    _this.openMobileMenu();
                }
            });

            $('.toggle-paper').on('click', function(){
                _this.togglePaper(this);
            });

            $(window).on('resize', _this.resizeDebounceFunc).resize();
        },
        resizeDebounceFunc: debounce(function() {
            var styleObj = window.getComputedStyle(
                document.querySelector('body'), ':after'
            );
        }, 250),
        initPaper: function() {
            var gif = null;

            $('.paper mark').each(function() {
                var $this = $(this),
                    $thisText = $(this).find('.text'),
                    gif = $this.data('gif'),
                    textWrap = $('<span class="text"></span>'),
                    txt = $this.html(),
                    txtNode;

                $this.empty();

                txtarr = txt.split(' ');

                textWrap.appendTo($this);

                $(txtarr).each(function(i, elm) {
                    txtNode = $('<span><em>' + elm + '</em></span>');
                    txtNode.appendTo($this.find('.text'));
                });
            });

            if (Waypoint.viewportWidth() < 768) {
                $('.paper').css({
                    top: this.winHeight - $('.paper').outerHeight()
                });
            } else {
                $('.paper').css({
                    opacity: 1
                });
            }
        },
        runExample: function(){
            var _this = this;

            _this.$paper.addClass('example');

            $('mark').eq(0).addClass('show-phrase');

            setTimeout(function() {
                $('mark').eq(0).removeClass('show-phrase');

                setTimeout(function() {
                    _this.$paper.removeClass('example');
                }, 500);
            }, 1000);
        },
        togglePaper: function(){
            if($('.paper').hasClass('show-me')){
                $('.toggle-paper').removeClass('open');
                $('.paper').removeClass('show-me');

                $('section').not('#header').show();

                this.$paperWrap.css({
                    'top': this.winHeight - $('.paper').outerHeight()
                });
            } else {
                $('.toggle-paper').addClass('open');
                $('.paper').addClass('show-me');

                $('section').not('#header').hide();

                this.$paperWrap.css({
                    'top': $('.highlighter-sessions-toolbar').offset().top + $('.highlighter-sessions-toolbar').height()
                });

                $('body, html').animate({
                    scrollTop: $('.highlighter-sessions-toolbar').offset().top
                });
            }
        },
        openMobileMenu: function() {
            $('.mobile-menu').css('height', window.innerHeight);
            $('body').addClass('mobile-menu-open');
        },
        closeMobileMenu: function() {
            $('body').removeClass('mobile-menu-open');
        },
        showPhrase: function(phrase) {
            var _this = this,
                $phrase = $(phrase),
                $highlight = $('mark', $phrase),
                gifDir = templateUrl + '/library/images/gifs/',
                gifUrl = gifDir + $phrase.data('gif');

            var ext = $phrase.data('gif').split('.').pop();

            $phrase.addClass('show-phrase');

            if (Waypoint.viewportWidth() < 768) {
                console.log('mobile size');
            } else {
                if(ext === ''){
                    return;
                }

                if(ext === 'gif'){
                    $('.giffify').css({
                        'background-image': 'url(' + gifUrl + ')',
                        'opacity': 0.2
                    });
                } else {
                    if(ext === 'engineers'){
                        setTimeout(function(){
                            $('#bones-stylesheet-css')[0].disabled = true;
                        }, 2000);
                    } else {
                        $('<video autoplay loop muted><source></source></video>').appendTo('.giffify');
                        $('.giffify').find('video source').attr('src', gifUrl);

                        $('.giffify').find('video')[0].oncanplay = function() {
                            console.log("Can start playing video");
                        };

                        $('.giffify').css({
                            'background-image': '',
                            'opacity': 0.2
                        });
                    }
                }

                // $('.paper-bg').css({
                //     opacity: 0.6
                // });
            }
        },
        resetPhrase: function(phrase) {
            var _this = this,
                $phrase = $(phrase);

            $phrase.removeClass('show-phrase');

            $('.giffify').find('video').remove();

            $('.giffify').css({
                'opacity': 0
            });

            // $('.paper-bg').css({
            //     opacity: 1
            // });
        },
        resetAllPhrases: function() {
            $('show-phrase').removeClass('show-phrase');

            $('.giffify').css({
                'opacity': 0
            });
        }
    };

    $(function() {
        PS.Highlighter.init();
    });
})(jQuery);
;var PS = PS || {};

(function($) {
    window.$ = $;
    PS.Contact = {
        init: function() {
            this.$lettersResting = $('.letter-resting');
            this.$lettersHover = $('.letter-hover');
            this.$lettersCopy = $([]);

            this.setOrigHoverLetters();

            this.createRestingLetters();

            this.setLetterPositionRestingData();
            this.setLetterPositionHoverData();

            this.setInitialLetterPosition();

            this.bindEvents();
        },
        bindEvents: function() {
            var _this = this;

            if(PS.env.touch){
                $('.city').on('in-view-down', function(){
                    // var $city = $(this);

                    // if(!$city.hasClass('seen-once')){
                    //     _this.animateLettersHover($city);

                    //     setTimeout(function(){
                    //         _this.animateLettersReset($city);
                    //     }, 2000);
                    // }
                });
            }

            $('.city').hover(function(){
                if($(this).hasClass('hovered')){
                    _this.animateLettersReset($(this));
                } else {
                    _this.animateLettersHover($(this));
                }
            });

            $(window).on('resize-done', function(){
                PS.Contact.resetLettersOnResize()
            });
        },
        setOrigHoverLetters: function(){
            $('.city').each(function(i, city){
                var posTop = $(city).find('.hover-content .inner').position().top;

                // $('.hover-letters', $(city)).css({
                //     top: posTop
                // });
            });
        },
        setLetterPositionRestingData: function() {
            var _this = this;

             this.$lettersResting.each(function(i, letter){
                var pos = {
                        top: 0,
                        left: 0
                    };

                $(letter).attr('id', 'rest-letter-' + i);

                pos.top = $(letter).position().top;
                pos.left = $(letter).position().left;

                $(letter).attr('data-position-top', pos.top);
                $(letter).attr('data-position-left', pos.left);

                $(letter).data('full-position', pos);

                $('.letter-copy').eq(i).data('full-position', pos);
             });
        },
        setLetterPositionHoverData: function(){
            var _this = this;

             this.$lettersHover.each(function(i, letter){
                var $newLetter = null;
                    pos = {
                        top: 0,
                        left: 0
                    };

                $(letter).attr('id', 'hov-letter-' + i);

                pos.top = $(letter).position().top;
                pos.top += $(letter).offsetParent().position().top;
                // pos.top += $(letter).offsetParent().offsetParent().position().top;

                pos.left = $(letter).position().left;
                pos.left += $(letter).offsetParent().position().left;
                // pos.left += $(letter).offsetParent().offsetParent().position().left;

                $(letter).attr('data-position-top', pos.top);
                $(letter).attr('data-position-left', pos.left);

                $(letter).data('full-position', pos);

                $('.letter-copy').eq(i).data('full-position-hover', pos);
             });
        },
        createRestingLetters: function(){
            var _this = this,
                pos;

            this.$lettersResting.each(function(i, letter){
                pos = $(letter).data('full-position');

                $newLetter = $('<span class="letter-copy"></span>')
                    .html($(letter).html())
                    .appendTo($(letter).closest('.city'));

                _this.$lettersCopy.push($newLetter);
            });
        },
        setInitialLetterPosition: function(){
            var posObj, _this = this;

            $('.letter-copy').each(function(i, letter){
                posObj = $(letter).data('full-position');

                _this.moveLetters($(letter), posObj);
            });
        },
        moveLetters: function($letter, locObj){
            var location = locObj || {};

            $letter.css({
                position: 'absolute',
                top: locObj.top,
                left: locObj.left
            });

            $letter.addClass('loaded');
        },
        resetLettersOnResize: function(){
            this.setOrigHoverLetters();
            this.setLetterPositionRestingData();
            this.setLetterPositionHoverData();
            this.setInitialLetterPosition();
        },
        animateLettersHover: function($city){
            $('.letter-copy', $city).each(function(i, elm){
                $(elm).css({
                    top: $(elm).data('fullPositionHover').top,
                    left: $(elm).data('fullPositionHover').left
                });
            });

            $city.addClass('hovered');
        },
        animateLettersReset: function($city){
            $('.letter-copy', $city).each(function(i, elm){
                $(elm).css({
                    top: $(elm).data('fullPosition').top,
                    left: $(elm).data('fullPosition').left
                });
            });

            $city.removeClass('hovered');
        }
    };

    $(function() {
        setTimeout(function(){
            PS.Contact.init();
            PS.Contact.resetLettersOnResize();
        }, 1000);
    });
})(jQuery);
;var PS = PS || {};

(function($) {
    PS.WaypointSetup = {
        init: function() {
        	this.bindEvents();

        	this.waypointElements = [
        		'#contact .city'
        	];

        	this.bindInViewWaypoints();
        	this.bindOutOfViewWaypoints();
        },
        bindEvents: function() {
        	_this = this;

        	// PS.env.touch/
        	// waypoint notification for each section
			$('#overview').waypoint({
			  	handler: function(direction) {
			   		if(direction === 'down'){
        				$('.contact-butter-bar').addClass('show');
        			}
			  	},
			  	offset: '85%'
			});

			$('#header').waypoint({
			  	handler: function(direction) {
			  		if(direction === 'up'){
						$('.contact-butter-bar').removeClass('show');
			  		}
			  	},
			  	offset: '-20%'
			});

			$('.footer').waypoint({
			  	handler: function(direction) {
			  		if(direction === 'up'){
						$('.contact-butter-bar').addClass('show');
			  		} else {
			  			$('.contact-butter-bar').removeClass('show');
			  		}
			  	},
			  	offset: '100%'
			});

			$('#jobs .highlight-text').waypoint({
			  	handler: function(direction) {
			  		if(direction === 'down'){
			  			$('#jobs').trigger('in-view-down');
						console.log('down to jobs');
			  		}
			  	},
				offset: function() {
					// when the bottom of the element hits the bottom of the viewport
					return Waypoint.viewportHeight() - $('#jobs .highlight-text').height();
				}
			});

			$('.scroll-waypoint').waypoint({
			  	handler: function(direction) {
			  		$(this.element).addClass('show-me');
			  	},
				offset: function() {
					// when the bottom of the element hits the bottom of the viewport
					return Waypoint.viewportHeight() - $('.contact-butter-bar').height() - 20;
				}
			});
        },

        bindInViewWaypoints: function($elm){
        	$(this.waypointElements).each(function(i, elm){
        		var $elm = $(elm);

				// waypoint notification city elemnts are IN OF view
				$elm.waypoint({
				  	handler: function(direction) {
				  		if(direction === 'down'){
				  			$(this.element).trigger('in-view-down');
				  			$(this.element).addClass('in-view seen-once');
				  		}
				  	},
					offset: function() {
						// when the bottom of the element hits the bottom of the viewport
						return Waypoint.viewportHeight() - this.element.clientHeight;
					}
				});

				// waypoint notification city elemnts are IN OF view
				$elm.waypoint({
				  	handler: function(direction) {
				  		if(direction === 'up'){
				  			$(this.element).trigger('in-view-up');
				  			$(this.element).addClass('in-view seen-once');
				  		}
				  	},
					offset: function() {
						// when the bottom of the element hits the bottom of the viewport
						return -Waypoint.viewportHeight()/2 + this.element.clientHeight;
					}
				});
			});
        },
        bindOutOfViewWaypoints: function(){
        	$(this.waypointElements).each(function(i, elm){
        		var $elm = $(elm);

				// waypoint notification city elemnts are OUT OF view
				$elm.waypoint({
				  	handler: function(direction) {
				  		if(direction === 'down'){
				  			$(this.element).trigger('out-of-view-down');
				  			$(this.element).removeClass('in-view');
				  		}
				  	},
					offset: function() {
						// when the bottom of the element hits the bottom of the viewport
						return -Waypoint.viewportHeight() + this.element.clientHeight;
					}
				});

				// waypoint notification city elemnts are OUT OF view
				$elm.waypoint({
				  	handler: function(direction) {
				  		if(direction === 'up'){
				  			$(this.element).trigger('out-of-view-up');
							$(this.element).removeClass('in-view');
				  		}
				  	},
					offset: function() {
						// when the bottom of the element hits the bottom of the viewport
						return Waypoint.viewportHeight();
					}
				});
        	});
        },
    };

    $(function() {
	    if(Waypoint.viewportWidth() >= 768){
	   		$('#loader').on('faded-out', function(){
	   			PS.WaypointSetup.init();
	   		});
	    } else {
	    	PS.WaypointSetup.init();
	    }
    });
})(jQuery);
;// Homepage Slider for Team Members

var PS = PS || {};

(function($) {
    PS.TeamSlider = {
        init: function(){
            var _this = this;

            this.$sliderContainer = $('.team-slider');
            this.$teamMembers = $('.team-member');
            this.$contentNav = $('.content-nav');
            this.$contentNavItems = $('li', this.$contentNav);

            this.sliderOptions = {
                adaptiveHeight: true,
                mode: 'fade',
                pager: false,
                nextSelector: '#slider-next',
                prevSelector: '#slider-prev',
                onSliderLoad: function(){
                    $('body').trigger('slider-loaded');

                    _this.$firstTeamPhoto = $('.team-member').eq(0);
                    _this.teamPhotoHeight = _this.$firstTeamPhoto.height();

                    if(Waypoint.viewportWidth() < 768){
                        $('.content-nav').css({
                            position: 'absolute',
                            top: $('.team-member-photo').position().top + $('.team-member-photo').height()
                        });
                    } else {
                        // _this.setContentHeight();
                    }

                    $('.content-nav').css({
                        opacity: 1,
                    });
                },
                onSlideBefore: function(){

                }
            };

            this.setupSlider();
            this.bindEvents();
        },

        updateContentHeight: function(){
            this.teamPhotoHeight = this.$firstTeamPhoto.height();
        },

        setContentHeight: function(){
            var _this = this;

            $('.team-member').each(function(){
                $(this).find('.content').css('height', _this.teamPhotoHeight);
            });
        },

        setupSlider: function(){
            var _this = this;

            this.teamSlider = this.$sliderContainer.bxSlider(this.sliderOptions);

            this.$sliderContainer.addClass('loaded');

            setTimeout(function(){
                _this.teamSlider.redrawSlider();

            }, 400);
        },

        bindEvents: function(){
            var _this = this;

            _this.$contentNavItems.on('click', function(){
                var slideToShow = $(this).data('about-navitem');

                _this.setActiveNavitem($(this));

                _this.updateCopySlide(slideToShow);
            });
        },

        updateCopySlide: function(slideToShow){
            var _this = this;
            var $curSlide = this.getCurrentSlideJquery(),
                slideToShow = '[data-nav-id="'+slideToShow+'"]';

            if(Waypoint.viewportWidth() < 768){
                $('.content', $curSlide).css({
                    height: $(slideToShow, $curSlide).outerHeight()
                });
            }

            $(slideToShow, $curSlide)
                .siblings()
                .not('nav')
                .hide();

            $(slideToShow, $curSlide).fadeIn();

            _this.teamSlider.redrawSlider();

        },

        setActiveNavitem: function($li){
            $li.addClass('active').siblings().removeClass('active');
        },

        getCurrentSlideJquery: function(){
            return this.$teamMembers.eq(this.teamSlider.getCurrentSlide());
        }
    }

    $(function() {
        PS.TeamSlider.init();
    });
})(jQuery);