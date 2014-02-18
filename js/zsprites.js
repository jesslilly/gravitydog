console.log("zsprites.js loaded");

var SpaceDog = function(ix, iy, w, h) {
	Sprite.call(this, ix, iy, w, h, "rgba(255,255,255,.7)");
};
SpaceDog.prototype = new Sprite();

// SpaceDog.prototype.update = function(layer, sprite) {
// this.x += (Math.random() - .5) * 3;
// this.y += (Math.random() - .5) * 3;
// };

SpaceDog.prototype.click = function(layer, sprite) {

	// Turn around
	this.aboutFace();

	// Shrink
	if (this.width > 20) {
		this.width -= 3;
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
	var newAngle = Math.random() * 90;
	// Rotate that angle into the correct quadrant.
	newAngle += (quadrant * 90);

	this.setVector(newAngle, this.speed + .2);

};
