console.log("star.js loaded");

define([ "vg/vg", "vg/prop", "vg/sprite" ], function(vg, Prop, Sprite) {

	var Star = function(ix, iy, w, h) {
		Sprite.call(this, ix, iy, w, h, "#FFFFFF");
	};
	Star.prototype = new Sprite();

	Star.prototype.update = function() {

		// super.update();
		Sprite.prototype.update.call(this);

		// Add code to twinkle?
	};
	Star.prototype.check500 = function() {

		if (!vg.hitTestRect(this.x, this.y, this.width, this.height, 0, 0, Sprite.bWidth, Sprite.bHeight)) {
			this.reappear();
		}
	};

	Star.prototype.warp = function() {
		this.x = 0 - this.width;
		this.y = Math.random() * Sprite.bHeight;
	};
	Star.prototype.center = function() {
		this.width = 1;
		this.height = 1;
		this.x = Sprite.bHeight / 2;
		this.y = 10;
	};
	Star.prototype.increase = function() {
		this.width += .25;
		this.height += .25;
	};
	// Default reappear behavior is to warp.
	Star.prototype.reappear = Star.prototype.warp;

	return Star;
});