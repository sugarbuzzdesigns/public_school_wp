var PS = PS || {};

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