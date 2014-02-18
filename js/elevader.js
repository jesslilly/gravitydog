console.log("elevader.js loaded");

$(document).ready(function() {
	var sprites = $("#sprites")[0];

	var main = function() {
		var canvas = $('#board')[0];

		var message = function(msg) {
			$('#messages').text(msg);
		};
		if (!canvas.getContext) {
			message("Shucks!  Try a different browser please?");
		}

		var ctx = canvas.getContext('2d');

		// Resize the canvas to a square that fits in the viewport.
		var vpw = verge.viewportW();
		var vph = verge.viewportH();
		var smaller = (vpw > vph) ? vph : vpw;
		canvas.width = smaller;
		canvas.height = smaller;
		Sprite.bWidth = canvas.width;
		Sprite.bHeight = canvas.height;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Create an animator. Refresh at 17ms which is 60Hz.
		var a = new Animator(ctx, 17);

		// Draw background.
		var bg = new Sprite(0, 0, canvas.width, canvas.height, "#000000");
		bg.update = function() {
		};
		a.add(0, bg);

		// Add star field!
		for ( var idx = 0; idx < 10; idx++) {
			var star = new Sprite(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1, "#FFFFFF");
			star.setVelocity(.2, .2);
			a.add(0, star);
		}

		var dog = new SpaceDog(canvas.width / 2, canvas.width / 2, 60, 60);
		dog.setClickable(true);
		dog.setVector(45, 1);
		dog.draw = function(ctx) {
			ctx.drawImage(sprites, 0, 0, 117, 101, this.x, this.y, this.width, this.height);
		};
		a.add(1, dog);
		a.go();

		// Draw star.
		ctx.drawImage(sprites, 0, 0, 44, 44, 20, 20, 44, 44);

		// draw grid.
		var grid = new Grid(canvas.width, canvas.height, 10);
		grid.draw(ctx);

	};

	sprites.addEventListener("load", function() {
		main();
	}, false);

});