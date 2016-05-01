var PS = PS || {};

(function($) {
    PS.Contact = {
        init: function() {
            this.startLetters = $('.letters span');
            this.endLetters = $('.letters-hover li');

            this.setLetterPositions();
            this.bindEvents();
        },
        bindEvents: function() {
            $('.city').mouseover(function(){
                
            });
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
})(jQuery);