console.log("animator.js loaded");

var Animator = (function() {
	var interval = 10;
	var ctx = null;
	// Just have 3 layers right now. Back, mid and foreground.
	var sprites = [ [], [], [] ];
	var clickables = [];
	var self;

	// I considered making this a singleton, but maybe not for now!
	var Animator = function(context, i) {
		ctx = context;
		interval = i;
		self = this;

		// Set up the click handler.
		var canvas = document.getElementById('canvas');
		var xoffset = canvas.offsetLeft + 2;
		var yoffset = canvas.offsetTop + 2;
		var click = function(e) {
			var x = e.pageX - xoffset;
			var y = e.pageY - yoffset;
			console.log("Click at " + x + "," + y);
			self.onClick(x, y);
		};
		if (canvas.addEventListener) {
			canvas.addEventListener("mousedown", click, false);
			canvas.addEventListener("touchstart", click, false);
		} else if (canvas.attachEvent) {
			canvas.attachEvent("onmousedown", click);
			canvas.attachEvent("ontouchstart", click);
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
