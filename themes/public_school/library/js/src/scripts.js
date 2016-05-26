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
    $('#header-logo img').attr('src', $('#header-logo img').data('src') + '?' + Math.floor(Date.now() / 1000)).show();
});