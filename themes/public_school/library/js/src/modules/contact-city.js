var PS = PS || {};

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