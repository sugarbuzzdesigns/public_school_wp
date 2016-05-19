var PS = PS || {};

(function($) {
    PS.Typer = {
        init: function(){
            console.log('init');
            $('#jobs').on('in-view-down', function(){
                $("#jobs h2 .highlight-text").typed({
                    strings: ['join public school'],
                    contentType: 'text',
                    showCursor: false,
                    typeSpeed: 100,
                    callback: function(){
                        $("#jobs h2 em").addClass('highlight');
                    }
                });              
            });
        }
    }

    $(function() {
        PS.Typer.init();      
    });
})(jQuery);