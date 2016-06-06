var PS = PS || {};

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

                $('.paper').css({
                    opacity: 0.6
                });
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

            $('.paper').css({
                opacity: 1
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
})(jQuery);