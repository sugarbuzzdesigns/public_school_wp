var PS = PS || {};

(function($) {
    window.$ = $;
    PS.Contact = {
        init: function() {
            this.$lettersResting = $('.letter-resting');
            this.$lettersHover = $('.letter-hover');

            this.setLetterPositionData();
            this.bindEvents();
        },
        bindEvents: function() {
            var _this = this;

            console.log(Waypoint);

            $('.city').on('in-view-down', function(){
                if(!$(this).hasClass('seen-once')){
                    $(this).trigger('mouseover');
                    setTimeout(function(){
                        $(this).trigger('mouseout');
                    }, 1000);
                }
            });

            $('.city').hover(function(){
                if($(this).hasClass('hovered')){
                    _this.animateLettersReset($(this));
                } else {
                    _this.animateLettersHover($(this));
                }
            });
        },
        setLetterPositionData: function() {
            var _this = this;

             this.$lettersResting.each(function(i, letter){
                var $newLetter = null;
                    pos = {
                        top: 0,
                        left: 0
                    };

                pos.top = $(letter).position().top;
                pos.left = $(letter).position().left;

                $(letter).attr('data-position-top', pos.top);
                $(letter).attr('data-position-left', pos.left);

                $(letter).data('full-position', pos);

                $newLetter = $('<span class="letter-copy"></span>')
                    .html($(letter).html())
                    .appendTo($(letter).closest('.city'));

                _this.moveLetters($newLetter, pos);

                $('.letter-copy')
                    .eq(i)
                    .data('full-position', pos);
             });

             this.$lettersHover.each(function(i, letter){
                var $newLetter = null;
                    pos = {
                        top: 0,
                        left: 0
                    };

                pos.top = $(letter).offsetParent().position().top;
                pos.top += $(letter).position().top;
                pos.left = $(letter).offsetParent().position().left;
                pos.left += $(letter).position().left;

                $(letter).attr('data-position-top', pos.top);
                $(letter).attr('data-position-left', pos.left);

                $(letter).data('full-position', pos);

                $('.letter-copy')
                    .eq(i)
                    .data('full-position-hover', pos);
             });
        },
        moveLetters: function($letter, locObj){
            var location = locObj || {};

            $letter.css({
                position: 'absolute',
                top: locObj.top,
                left: locObj.left
            });
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
        }, 100);
    });
})(jQuery);