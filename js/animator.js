console.log("animator.js loaded");

var Animator = (function() {
	var interval = 10;
	var ctx = null;
	// Just have 3 layers right now. Back, mid and foreground.
	var sprites = [ [], [], [] ];
	var clickables = [];
	var self;
	var scaleFactor = 1;

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
			console.log("Click at " + x + "," + y + " using scale "+ scaleFactor);
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

	Animator.prototype.go = function() {
		var id = setInterval(function() {
			try {
				sprites.forEach(function(layer) {
					layer.forEach(function(sprite) {
						sprite.update && sprite.update();
						sprite.draw(ctx);
					});
				});
			} catch (error) {
				console.error(error.message);
				clearInterval(id);
			}
		}, interval);
	};

	return Animator;
})();
