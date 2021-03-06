var PS = PS || {};

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