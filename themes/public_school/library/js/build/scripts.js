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

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;

$(window).on('resize', function(){
    console.log('resized');
});

var PS = {};


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

            if (this.mobile && WURFL.form_factor != 'Tablet') {
                this.runExample();
            }
        },
        bindEvents: function() {
            var _this = this;

            if (_this.mobile && WURFL.form_factor != 'Tablet') {
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
                    _this.resetPhrase(this);
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

            if (this.mobile && WURFL.form_factor != 'Tablet') {
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
                gifDir = window.location.href + '/images/gifs/',
                gifUrl = gifDir + $phrase.data('gif');

            $phrase.addClass('show-phrase');

            if (_this.mobile && WURFL.form_factor != 'Tablet') {
                console.log('tablet or desktop');
            } else {
                $('.giffify').css({
                    'background-image': 'url(' + gifUrl + ')',
                    'opacity': 0.5
                });
            }
        },
        resetPhrase: function(phrase) {
            var _this = this,
                $phrase = $(phrase);

            $phrase.removeClass('show-phrase');

            $('.giffify').css({
                'opacity': 0
            });
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
})(jQuery);;var PS = PS || {};

(function($) {
    PS.Contact = {
        init: function() {
            this.startLetters = $('.letters span');
            this.endLetters = $('.letters-hover li');

            this.setLetterPositions();


        },
        bindEvents: function() {
           
        },
        setLetterPositions: function() {
             this.startLetters.each(function(i, letter){
                $(letter).data('position', $(letter).offset());
             });

             this.endLetters.each(function(i, letter){
                $(letter).data('position', $(letter).offset());
             });             
        }
    };

    $(function() {
        PS.Contact.init();
    });
})(jQuery);;var PS = PS || {};

(function($) {
    PS.WaypointSetup = {
        init: function() {
        	this.bindEvents();
        },
        bindEvents: function() {
        	_this = this;
        	// waypoint notification for each section
			$('#overview').waypoint({
			  	handler: function(direction) {
			   		if(direction === 'down'){
        				$('.contact-butter-bar').addClass('show');
        			} 
			  	},
			  	offset: '85%;'
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

			// waypoint notification city elemnts are IN view
			$('#contact .city').waypoint({
			  	handler: function(direction) {
			   		$(this.element).addClass('animate');
			  	},
			  	offset: $(window).height() - $('.city').height()/2
			}); 

			// waypoint notification city elemnts are OUT OF view
			$('#contact .city').waypoint({
			  	handler: function(direction) {
			   		$(this.element).removeClass('animate');
			  	},
			  	offset: '-50%'
			}); 						          
        }
    };

    $(function() {
        PS.WaypointSetup.init();
    });
})(jQuery);