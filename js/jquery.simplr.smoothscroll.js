/**
 * jquery.simplr.smoothscroll
 * version 1.0
 * copyright (c) 2012 https://github.com/simov/simplr-smoothscroll
 * licensed under MIT
 * requires jquery.mousewheel - https://github.com/brandonaaron/jquery-mousewheel/
 */
;(function($) {
    'use strict';
    
    $.srSmoothscroll = function(options) {
    
    var self = $.extend({
        speed: 250,
        ease: "swing"
    }, options || {});
    
    // private fields & init
    var win = $(window),
        doc = $(document),
        top = 0,
        speed = self.speed,
        viewport = win.height(),
        body = (navigator.userAgent.indexOf('AppleWebKit') !== -1) ? $('body') : $('html'),
        wheel = false;

    // events
    $('body').mousewheel(function(event, delta, unused, unused2, lowestDelta) {
	    body.stop();
	    
	    if ( lowestDelta < 100 )
	    {
		    // probably touchpad, let default handler do it.
		    return true;
		}
		
		// else, probably mousewheel
		
		var adjusted = Math.floor(delta * lowestDelta);
		var max = 500;
		
		if ( adjusted > max )
			adjusted = max;
			
		else if ( adjusted < -max )
			adjusted = -max;
			
		if ( adjusted > 120 || adjusted < -120 )
			self.ease = 'swing';
		else
			self.ease = 'linear';
		
		//console.log('delta ' + delta + ' lowestDelta ' + Math.floor(lowestDelta) + ' adjusted ' + adjusted);
		
		wheel = true;
		
		if (adjusted < 0) // down
		    top = (top+viewport) >= doc.height() ? top : top-=adjusted;
		    
		else // up
			top = top <= 0 ? 0 : top-=adjusted;
		
		body.animate({scrollTop: top}, speed, self.ease, function () {
		    wheel = false;
		});
			
        return false;
    });

	
    win
    .on('resize', function (e) {
        viewport = win.height();
    })
    .on('scroll', function (e) {
        if (!wheel)
            top = win.scrollTop();
    });
    
    };
})(jQuery);
