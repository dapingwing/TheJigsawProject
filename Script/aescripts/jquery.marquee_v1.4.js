/**
* author Remy Sharp
* url http://remysharp.com/tag/marquee
*/

(function ($) {
	$.fn.marquee = function (klass) {
		var newMarquee = [],
            last = this.length;

		// works out the left or right hand reset position, based on scroll
		// behavior, current direction and new direction
		function getReset(newDir, marqueeRedux, marqueeState) {
			var behavior = marqueeState.behavior, width = marqueeState.width, dir = marqueeState.dir;
			var r = 0;
			if (behavior == 'alternate') {
				r = newDir == 1 ? marqueeRedux[marqueeState.widthAxis] - (width * 2) : width;
			} else if (behavior == 'slide') {
				if (newDir == -1) {
					r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] : width;
				} else {
					r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] - (width * 2) : 0;
				}
			} else {
				r = newDir == -1 ? marqueeRedux[marqueeState.widthAxis] : 0;
			}
			return r;
		}

		// single "thread" animation
		function animateMarquee() {
			var i = newMarquee.length,
                marqueeRedux = null,
                $marqueeRedux = null,
                marqueeState = {},
                newMarqueeList = [],
                hitedge = false;

			while (i--) {
				marqueeRedux = newMarquee[i];
				$marqueeRedux = $(marqueeRedux);
				marqueeState = $marqueeRedux.data('marqueeState');

				if ($marqueeRedux.data('paused') !== true) {
					// TODO read scrollamount, dir, behavior, loops and last from data
					marqueeRedux[marqueeState.axis] += (marqueeState.scrollamount * marqueeState.dir);
					if (marqueeState.left != 0) {
						// set starting position
						marqueeState.left = 0;
						if ((marqueeRedux[marqueeState.widthAxis] - marqueeState.width * 2) < marqueeState.width) {
							marqueeRedux[marqueeState.axis] += marqueeRedux[marqueeState.widthAxis] - marqueeState.width * 2;
							marqueeState.loops = 1;
							marqueeState.behavior = 'slide';
						} else {
							marqueeRedux[marqueeState.axis] += marqueeState.width;
						}
						//marqueeState.behavior = "slide";
						//alert("tst total: " + (marqueeRedux[marqueeState.widthAxis] - marqueeState.width * 2));
					}
					//marqueeRedux[marqueeState.axis] += (marqueeState.scrollamount * marqueeState.dir) + marqueeState.trueSpeed;

					// only true if it's hit the end
					hitedge = marqueeState.dir == -1 ? marqueeRedux[marqueeState.axis] <= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState) : marqueeRedux[marqueeState.axis] >= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);

					if ((marqueeState.behavior == 'scroll' && marqueeState.last == marqueeRedux[marqueeState.axis]) || (marqueeState.behavior == 'alternate' && hitedge && marqueeState.last != -1) || (marqueeState.behavior == 'slide' && hitedge && marqueeState.last != -1)) {
						if (marqueeState.behavior == 'alternate') {
							marqueeState.dir *= -1; // flip
						}
						marqueeState.last = -1;

						$marqueeRedux.trigger('stop');

						marqueeState.loops--;
						if (marqueeState.loops === 0) {
							if (marqueeState.behavior != 'slide') {
								marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
							} else {
								// corrects the position
								marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);
							}

							$marqueeRedux.trigger('end');
						} else {
							// keep this marquee going
							newMarqueeList.push(marqueeRedux);
							$marqueeRedux.trigger('start');
							marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
						}
					} else {
						newMarqueeList.push(marqueeRedux);
					}
					marqueeState.last = marqueeRedux[marqueeState.axis];

					// store updated state only if we ran an animation
					$marqueeRedux.data('marqueeState', marqueeState);
				} else {
					// even though it's paused, keep it in the list
					newMarqueeList.push(marqueeRedux);
				}
			}

			newMarquee = newMarqueeList;

			if (newMarquee.length) {
				setTimeout(animateMarquee, 50); // original = 25
			}
		}

		// TODO consider whether using .html() in the wrapping process could lead to loosing predefined events...
		this.each(function (i) {
			var $marquee = $(this),
                width = $marquee.attr('width') || $marquee.width(),
                height = $marquee.attr('height') || $marquee.height(),
				//width = 600;
				//$marqueeRedux = $marquee.after('<div ' + (klass ? 'class="' + klass + '" ' : '') + 'style="display: block-inline; width: ' + width + 'px; height: ' + height + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + width + ":::" + $marquee.html() + '</div></div>').next(),
				//$marqueeRedux = $marquee.after('<div ' + (klass ? 'class="' + klass + '" ' : '') + 'style="display: block-inline; width: ' + width + 'px; height: ' + height + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + $marquee.html() + '</div></div>').next(),
				$marqueeRedux = $marquee.after('<div id="ticker1" ' + (klass ? 'class="' + klass + '" ' : '') + 'style="display: block-inline; width: ' + width + 'px; height: ' + height + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + $marquee.html() + '</div></div>').next(),
                marqueeRedux = $marqueeRedux.get(0),
                hitedge = 0,
                direction = ($marquee.attr('direction') || 'left').toLowerCase(),
                marqueeState = {
                	dir: /down|right/.test(direction) ? -1 : 1,
                	axis: /left|right/.test(direction) ? 'scrollLeft' : 'scrollTop',
                	widthAxis: /left|right/.test(direction) ? 'scrollWidth' : 'scrollHeight',
                	last: -1,
                	loops: $marquee.attr('loop') || -1,
                	scrollamount: $marquee.attr('scrollamount') || this.scrollAmount || 2,
                	behavior: ($marquee.attr('behavior') || 'scroll').toLowerCase(),
                	width: /left|right/.test(direction) ? width : height,
                	left: $marquee.attr('left') || this.left || 0
                };

			// corrects a bug in Firefox - the default loops for slide is -1
			if ($marquee.attr('loop') == -1 && marqueeState.behavior == 'slide') {
				marqueeState.loops = 1;
			}

			$marquee.remove();

			// add padding
			if (/left|right/.test(direction)) {
				$marqueeRedux.find('> div').css('padding', '0 ' + width + 'px');
			} else {
				$marqueeRedux.find('> div').css('padding', height + 'px 0');
			}

			// events
			$marqueeRedux.bind('stop', function () {
				$marqueeRedux.data('paused', true);
			}).bind('pause', function () {
				$marqueeRedux.data('paused', true);
			}).bind('start', function () {
				$marqueeRedux.data('paused', false);
			}).bind('unpause', function () {
				$marqueeRedux.data('paused', false);
			}).data('marqueeState', marqueeState); // finally: store the state

			// todo - rerender event allowing us to do an ajax hit and redraw the marquee

			newMarquee.push(marqueeRedux);

			marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
			$marqueeRedux.trigger('start');

			// on the very last marquee, trigger the animation
			if (i + 1 == last) {
				animateMarquee();
			}
		});

		return $(newMarquee);
	};
} (jQuery));




// T W E A K S

var tickerWinSize = 0;

// fix for the TABLE TD box (BUG left/right gone when window resized)
$(document).ready(function () {
	if (document.getElementById("main-header-news") != null) {
		//alert("exist");
		$("td.box-left").html("<div style='width: 9px;'>");
		$("td.box-right").html("<div style='width: 9px;'>");

		//tickerWinSize = parseInt(document.body.offsetWidth);
	}
});

// fix for the window resize bug

function resize_id(obj) {
	//tickerWinSize = parseInt(document.getElementById(obj).parentNode.offsetWidth);
	//alert("tickerw: " + tickerWinSize);
	var tmp_newsize = 30;
	document.getElementById(obj).style.width = tmp_newsize + 'px';

	tickerWinSize = parseInt(document.getElementById(obj).parentNode.offsetWidth);
	document.getElementById(obj).style.width = tickerWinSize + 'px';

	//document.getElementById('map2_Viewport').style.width = '300px';
	//alert("tickerw: " + tickerWinSize);
	return;

	var tmp_winsize = parseInt(document.body.offsetWidth);
	if (tmp_winsize > 840) {
		var tmp_ration = tmp_winsize / tickerWinSize;
		var tmp_tickwize = parseInt(document.getElementById(obj).style.width);
		tmp_newsize = Math.round(tmp_tickwize * tmp_ration);
		document.getElementById(obj).style.width = tmp_newsize + 'px';
	}
	tickerWinSize = tmp_winsize;
}
window.onresize = function () { resize_id('ticker1'); }

