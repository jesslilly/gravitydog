console.log("animator.js loaded");

define([ "vg/prop", "vg/clickable", "vg/sprite" ], function(Prop, Clickable, Sprite) {

	var interval = 10;
	var ctx = null;
	// Just have 3 layers right now. Back, mid and foreground.
	var sprites = [ [], [], [] ];
	var clickables = [];
	var self;
	var scaleFactor = 1;
	var intervalId = 0;
	var i500Counter = 0;

	// I considered making this a singleton, but maybe not for now!
	var Animator = function(context, i, scale) {
		ctx = context;
		interval = i;
		scaleFactor = scale;
		self = this;

		// Set up the click handler.
		var canvas = document.getElementById('canvas');
		var xoffset = canvas.offsetLeft + 2;
		var yoffset = canvas.offsetTop + 2;
		var click = function(e) {
			var x = Math.round((e.pageX - xoffset) * scaleFactor);
			var y = Math.round((e.pageY - yoffset) * scaleFactor);
			console.log("Click at " + x + "," + y + " using scale "
					+ scaleFactor);
			self.onClick(x, y);
		};
		if (canvas.addEventListener) {
			canvas.addEventListener("mousedown", click, false);
			canvas.addEventListener("touchstart", function(e) {
				// This prevents both actions from firing on a mobile.
				// Also prevents other actions like screen resize which is good!
				click(e);
				e.stopPropagation();
				e.preventDefault();
			}, false);
		} else if (canvas.attachEvent) {
			canvas.attachEvent("onmousedown", click);
			canvas.attachEvent("ontouchstart", function(e) {
				click(e);
				e.stopPropagation();
				e.preventDefault();
			});
		}
	};

	Animator.prototype.onClick = function(cx, cy) {
		clickables.forEach(function(clickable) {
			if (clickable.clickTest(cx, cy)) {
				clickable.click();
			}
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