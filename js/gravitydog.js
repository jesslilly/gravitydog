console.log("elevader.js loaded");

(function() {
	var sprites = document.getElementById("sprites");

	var canvas = document.getElementById('canvas');

	var scaleFactor = 1; // It's always a square, so it's the same for x and
							// y.

	if (!canvas.getContext) {
		alert("Shucks!  Try a different browser please?");
	}

	var ctx = canvas.getContext('2d');
	/* http://stackoverflow.com/questions/7615009/disable-interpolation-when-scaling-a-canvas */
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;

	var a = null;

	var main = function() {

		// Resize the canvas to a square that fits in the viewport.
		var vpw = verge.viewportW();
		var vph = verge.viewportH();
		var smaller = (vpw > vph) ? vph : vpw;

		// Don't change the canvas size programatically. I want the canvas to
		// always be the same so point, 10,10 is always the same. What changes
		// is the
		// CSS w/h to scale the entire canvas to fit the actual screen size.
		// canvas.width = smaller;
		// canvas.height = smaller;

		canvas.style.width = smaller + "px";
		canvas.style.height = smaller + "px";
		canvas.style.background = '#000000';
		/* http://stackoverflow.com/questions/7791286/getting-correct-mouse-position-on-canvas-when-canvas-size-is-relative */
		scaleFactor = canvas.width / smaller;

		// Create an animator. Refresh at 17ms which is 60Hz.
		a = new Animator(ctx, 17, scaleFactor);

		Sprite.bWidth = canvas.width;
		Sprite.bHeight = canvas.height;
		createSprites();
		addScore();
	};

	var createSprites = function() {

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Draw background.
		var bg = new Sprite(0, 0, canvas.width, canvas.height, "#000000");
		bg.update = function() {
		};
		a.add(0, bg);
		// Go into buggy animation mode when you get a nice high score.
		a.customAnimationHook = function() {
			if (vg.getScore() > 29) {
				bg.draw = function() {};
			}
		};

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
		var dog = new SpaceDog(100, 100, 118 * 1.5, 88 * 1.5);
		// dog.setVector(45, 1);
		// TODO: Move images to the Sprite class.
		dog.draw = function(ctx) {
			ctx.drawImage(sprites, 0, 0, 118, 88, this.x, this.y, this.width, this.height);
		};
		a.add(1, dog);
		a.go();

	};

	var addScore = function() {

		// Score Icon
		var scoreIcon = new Prop(10, 10, 29, 29);
		scoreIcon.draw = function(ctx) {
			ctx.drawImage(sprites, 133, 8, 29, 29, this.x, this.y, this.width, this.height);
		};
		a.add(2, scoreIcon);

		// Score board
		var letterWidth = 30;
		var score = new Prop(50, 10, letterWidth, letterWidth);
		score.draw = function(ctx) {

			var digits = (vg.getScore() + "").split("");
			digits.forEach(function(digit, idx) {

				var sourceHeight = (31 * digit) + 214;
				var x = 50 + (idx * letterWidth);
				ctx.drawImage(sprites, 1, sourceHeight, 30, 30, x, 10, letterWidth, letterWidth);

			});
		};
		a.add(2, score);

		// Screen size
		var size = new Prop(300, 16, 0, 0);
		size.draw = function(ctx) {
			// Keep in mind this might be the canvas size and not
			// the scaled size as per CSS.
			ctx.font = "14pt Arial";
			ctx.fillStyle = "white";
			ctx.fillText(canvas.style.width + "x" + canvas.style.height, this.x, this.y);
		};
		a.add(2, size);

	};

	main();

})();