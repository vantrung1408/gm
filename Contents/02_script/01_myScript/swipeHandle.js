$.fn.onSwipe = function registerSwipeEvent(eventName, funcHandle){
	var elem = this;
	elem[0].addEventListener('touchstart', handleTouchStart, false);        
	elem[0].addEventListener('touchmove', handleTouchMove, false);

	var xDown = null;                                                        
	var yDown = null;                                                        

	function handleTouchStart(evt) {                                         
	    xDown = evt.touches[0].clientX;                                      
	    yDown = evt.touches[0].clientY;                                      
	};                                                

	function handleTouchMove(evt) {
	    if ( ! xDown || ! yDown ) {
	        return;
	    }

	    var xUp = evt.touches[0].clientX;                                    
	    var yUp = evt.touches[0].clientY;

	    var xDiff = xDown - xUp;
	    var yDiff = yDown - yUp;

	    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
	        if ( xDiff > 0 && eventName == 'left') {
	            funcHandle(elem);
	        } else if(xDiff < 0 && eventName == 'right') {
	            funcHandle(elem);
	        }                       
	    } else {
	        if ( yDiff > 0 && eventName == 'up') {
	            funcHandle(elem);
	        } else if(yDiff < 0 && eventName == 'down') { 
	            funcHandle(elem);
	        }                                                                 
	    }
	    /* reset values */
	    xDown = null;
	    yDown = null;                                             
	};

	return elem;
}