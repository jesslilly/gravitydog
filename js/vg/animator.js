console.log("animator.js loaded");

define([ "vg/prop", "vg/clickable", "vg/sprite" ], function(Prop, Clickable, Sprite) {

	var interval = 10;
	var ctx = null;
	// Just have 3 layers right now. Back, mid and foreground.
	var sprites = [ [], [], [] ];
	var clickables = [];
	var self;
	var intervalId = 0;
	var i500Counter = 0;

    // I considered making this a singleton, but maybe not for now!
    // There is no x and y for scale since we are using a square board.
	var Animator = function(context, i, scale) {
		ctx = context;
		interval = i;
		this.scaleFactor = scale;
		self = this;

		// Set up the click handler.
		var canvas = document.getElementById('canvas');
		var xoffset = canvas.offsetLeft + 2;
		var yoffset = canvas.offsetTop + 2;
		var clickBegin = function(clickX, clickY) {
		    var x = Math.round((clickX - xoffset) * self.scaleFactor);
		    var y = Math.round((clickY - yoffset) * self.scaleFactor);
			console.log("ClickBegin at " + x + "," + y + " using scale "
					+ self.scaleFactor);
			self.onClickBegin(x, y);
		};
		var clickEnd = function(clickX, clickY) {
		    var x = Math.round((clickX - xoffset) * self.scaleFactor);
		    var y = Math.round((clickY - yoffset) * self.scaleFactor);
			console.log("ClickEnd at " + x + "," + y + " using scale "
					+ self.scaleFactor);
			self.onClickEnd(x, y);
		};

		// ================
		// Event listeners:
		// ================
		// preventDefault prevents both mouse and touch events from firing on a mobile.
		// Also prevents other actions like screen resize which is good!
		// https://stackoverflow.com/a/16216841/1804678

		// Need to track touchmove coordinates since touchend does not have them.
		// https://stackoverflow.com/a/4709593/1804678
		var touchMoveX = 0;
		var touchMoveY = 0;

		// TODO: Remove duplicate code... haha.
		if (canvas.addEventListener) {
			canvas.addEventListener("mousedown", function(e) {
			    clickBegin(e.pageX, e.pageY);
			}, false);
			canvas.addEventListener("touchstart", function(e) {
			    e.preventDefault();
			    clickBegin(e.touches[0].pageX, e.touches[0].pageY);
			}, false);
			canvas.addEventListener("mouseup", function(e) {
			    clickEnd(e.pageX, e.pageY);
			}, false);
			canvas.addEventListener("touchmove", function(e) {
				e.preventDefault();
				touchMoveX = e.touches[0].pageX;
				touchMoveY = e.touches[0].pageY;
			}, false);
			canvas.addEventListener("touchend", function(e) {
			    e.preventDefault();
			    clickEnd(touchMoveX, touchMoveY);
			}, false);
		} else if (canvas.attachEvent) {
		    canvas.attachEvent("onmousedown", function (e) {
		        clickBegin(e.pageX, e.pageY);
		    });
			canvas.attachEvent("ontouchstart", function (e) {
			    e.preventDefault();
			    clickBegin(e.touches[0].pageX, e.touches[0].pageY);
			});
		    canvas.attachEvent("mouseup", function (e) {
		        clickEnd(e.pageX, e.pageY);
		    });
			canvas.attachEvent("touchmove", function(e) {
				e.preventDefault();
				touchMoveX = e.touches[0].pageX;
				touchMoveY = e.touches[0].pageY;
			});
			canvas.attachEvent("touchend", function(e) {
			    e.preventDefault();
			    clickEnd(touchMoveX, touchMoveY);
			});
		}
	};

	Animator.prototype.setScaleFactor = function (scale) {
	    this.scaleFactor = scale;
	    return this;
	};

	Animator.prototype.onClickBegin = function(cx, cy) {
		clickables.forEach(function(clickable) {
			if (clickable.clickTest(cx, cy)) {
				clickable.shrink();
				clickable.clickBegin();
			}
		});
	};

	Animator.prototype.onClickEnd = function(cx, cy) {
		clickables.forEach(function(clickable) {
			if (clickable.clickTest(cx, cy)) {
				clickable.clickEnd();
			}
			clickable.unshrink();
		});
	};

	Animator.prototype.add = function(layer, sprite) {
		sprites[layer].push(sprite);
		if (sprite instanceof Clickable) {
			clickables.push(sprite);
		}
		return this;
	};

	Animator.prototype.clear = function() {
		sprites.forEach(function(layer, idx) {
			sprites[idx] = [];
		});
		clickables = [];
		Animator.iterator = 0;
		this.stop();
		return this;
	};

	Animator.prototype.customAnimationHook = function() {
	};

	Animator.prototype.go = function() {
		intervalId = setInterval(function() {
			try {
				sprites.forEach(function(layer) {
					layer.forEach(function(sprite) {
						sprite.update && sprite.update();
						sprite.check && sprite.check();

						// For performance, things that don't need to update
						// or check very often can do it on the 500ms mark.
						if (i500Counter > 500) {
							sprite.update500 && sprite.update500();
							sprite.check500 && sprite.check500();
						}
						sprite.draw(ctx);
					});
				});

				self.customAnimationHook();
				Animator.iterator++;
				i500Counter = (i500Counter > 500) ? 0 : i500Counter + interval;
			} catch (error) {
				console.error(error.message);
				clearInterval(intervalId);
			}
		}, interval);
	};

	Animator.prototype.stop = function() {
		clearInterval(intervalId);
	};

	Animator.iterator = 0;
	Animator.prototype.getIteration = function() {
		return Animator.iterator;
	};

	return Animator;

});