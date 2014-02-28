console.log("zsprites.js loaded");

var SpaceDog = function(ix, iy, w, h) {
	Clickable.call(this, ix, iy, w, h, "rgba(255,255,255,.7)");
	if (vg.isMobile()) {
		this.setPadding(10);
	}
};
SpaceDog.prototype = new Clickable();

SpaceDog.prototype.update1 = function() {

	this.vOscillate(3);
	this.check4GameOver();
};

SpaceDog.prototype.update2 = function() {
	
	// Call super method.
	Sprite.prototype.update.call(this);
	this.check4GameOver();
};

SpaceDog.prototype.check4GameOver = function() {
	if (!vg.hitTestRect(this.x, this.y, this.width, this.height, 0, 0, Sprite.bWidth, Sprite.bHeight)) {
		alert("Game Over!!!!");
		this.update = function() {};
	}
};

// Initial "update" is just sitting there and oscillating.
SpaceDog.prototype.update = SpaceDog.prototype.update1;

SpaceDog.prototype.click = function() {

	vg.scorePlus(1);

	// Turn around
	this.aboutFace();

	// Remove vOscillate at a certain speed since you can't see it anyway.
	// Performance.
	if (this.speed > 3) {
		this.update = SpaceDog.prototype.update2;
	}

	// Shrink
	if (this.width > 50) {
		this.width -= 4;
		this.height -= 3;
	}
};

SpaceDog.prototype.aboutFace = function() {

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
	// For now for speed, I don't care about using the sprite's center point.
	// Get a new angle 0-90.
	var newAngle = Math.round(Math.random() * 90);
	// Rotate that angle into the correct quadrant.
	newAngle += (quadrant * 90);

	this.speed = (this.speed === 0) ? 1 : this.speed + .3;

	this.setVector(newAngle, this.speed);

};
