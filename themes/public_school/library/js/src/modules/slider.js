// Homepage Slider for Team Members

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

                },
                onSlideBefore: function(){

                }
            };

            this.setupSlider();
            this.bindEvents();
        },

        setupSlider: function(){
            var _this = this;

            this.teamSlider = this.$sliderContainer.bxSlider(this.sliderOptions);   

            this.$sliderContainer.addClass('loaded');

            setTimeout(function(){
                _this.teamSlider.redrawSlider();

            }, 100); 
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

            $('.content', $curSlide).css({
                height: $(slideToShow, $curSlide).outerHeight()
            });

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







