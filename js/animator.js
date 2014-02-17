console.log("animator.js loaded");

var Animator = (function() {
	var interval = 10;
	var ctx = null;
	// Just have 3 layers right now. Back, mid and foreground.
	var sprites = [ [], [], [] ];

	// I considered making this a singleton, but maybe not for now!
	var Animator = function(context, i) {
		ctx = context;
		interval = i;

		// Set up the click handler.
		var xoffset = $("#board").offset().left + 2;
		var yoffset = $("#board").offset().top + 2;
		$("#board").click(function(e) {
			var x = e.pageX - xoffset;
			var y = e.pageY - yoffset;
			console.log("Click at " + x + "," + y);
		});
	};

	Animator.prototype.add = function(layer, sprite) {
		sprites[layer].push(sprite);
		return this;
	};

	Animator.prototype.go = function() {
		var id = setInterval(function() {
			try {
				sprites.forEach(function(layer) {
					layer.forEach(function(sprite) {
						sprite.update();
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
