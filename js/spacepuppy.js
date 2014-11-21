console.log("SpacePuppy.js loaded");

define([ "vg/vg", "vg/animator", "vg/clickable", "vg/prop", "vg/sprite" ], function(vg, Animator, Clickable, Prop, Sprite) {

    // TODO: Implement factor pattern with dependency injection for all sprites/props.
    // That way all sprites can have a reference to the animator and canvas.
    // That will help with die() method so a sprite can remove itself from the animator.
	var SpacePuppy = function(ix, iy, w, h, gameOverCb) {
		Clickable.call(this, ix, iy, w, h, "rgba(255,255,255,.7)");
		this.gameOverCb = gameOverCb;
		if (vg.isMobile()) {
			this.setPadding(10);
		}
		SpacePuppy.dogCount++;
	};

    SpacePuppy.dogCount = 0;

	SpacePuppy.prototype = new Clickable();

	SpacePuppy.prototype.check500 = function() {
		var clickRect = this.getClickRect();
		if (!vg.hitTestRect(clickRect.x, clickRect.y, clickRect.width, clickRect.height, 0, 0, Sprite.bWidth, Sprite.bHeight)) {
		    this.die();
		}
	};

	SpacePuppy.prototype.die = function () {
	    this.check500 = function () {
	    };
	    SpacePuppy.dogCount--;

	    if (SpacePuppy.dogCount <= 0) {
	        this.gameOverCb();
	    }
	};

	SpacePuppy.prototype.click = function() {

		vg.scorePlus(1);

		// Turn around
		this.aboutFace();
	};

	SpacePuppy.prototype.aboutFace = function() {

		// What quadrant are we in? (Actually get the opposite quadrant)
		// 0 1
		// 3 2
		var center = {};
		center.x = Sprite.bWidth / 2;
		center.y = Sprite.bHeight / 2;
		var quadrant = 0;
		if (this.x > center.x && this.y > center.y) {
			quadrant = 2;
		} else if (this.y > center.y) {
			quadrant = 3;
		} else if (this.x > center.x) {
			quadrant = 1;
		}
		// For now for speed, I don't care about using the sprite's
		// center point.
		// Get a new angle 0-90.
		var newAngle = Math.round(Math.random() * 90);
		// Rotate that angle into the correct quadrant.
		newAngle += (quadrant * 90);

		this.speed = (this.speed === 0) ? 1 : this.speed + .3;

		this.setVector(newAngle, this.speed);

	};
	
	return SpacePuppy;

});
