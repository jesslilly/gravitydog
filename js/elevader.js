console.log("elevader.js loaded");

(function() {
	var sprites = document.getElementById("sprites");

	var main = function() {
		var canvas = document.getElementById('canvas');

		if (!canvas.getContext) {
			alert("Shucks!  Try a different browser please?");
		}

		var ctx = canvas.getContext('2d');

		// Resize the canvas to a square that fits in the viewport.
		var vpw = verge.viewportW();
		var vph = verge.viewportH();
		var smaller = (vpw > vph) ? vph : vpw;
		canvas.width = smaller;
		canvas.height = smaller;
		
		// TODO: This works, but the click coordinates now need to scale also.
//		canvas.style.width = smaller + "px";
//		canvas.style.height = smaller + "px";
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
			var star = new Sprite(Math.random() * canvas.width, Math.random() * canvas.height, 3, 3, "#FFFFFF");
			star.setVelocity(.1, 0);
			a.add(0, star);
		}
		
		// Add the earth!
		var earth = new Prop(Math.random() * canvas.width, Math.random() * canvas.height, 114, 114);
		earth.draw = function(ctx) {
			ctx.drawImage(sprites, 0, 93, 114, 114, this.x, this.y, this.width, this.height);
		};
		a.add(1, earth);

		// Add the dog!
		var dog = new SpaceDog(canvas.width / 2, canvas.width / 2, 118, 88);
		dog.setVector(45, 1);
		// TODO: Move images to the Sprite class.
		dog.draw = function(ctx) {
			ctx.drawImage(sprites, 0, 0, 118, 88, this.x, this.y, this.width, this.height);
		};
		a.add(1, dog);
		a.go();

		// Draw star.
//		ctx.drawImage(sprites, 0, 0, 44, 44, 20, 20, 44, 44);

		// draw grid.
//		var grid = new Grid(canvas.width, canvas.height, 10);
//		grid.draw(ctx);

	};

//	sprites.addEventListener("load", function() {
//		main();
//	}, false);
	main();

})();