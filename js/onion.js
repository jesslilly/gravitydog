console.log("onion.js loaded");

define([ "vg/vg", "vg/prop", "vg/sprite" ], function(vg, Prop, Sprite) {

	// TODO: Implement factor pattern with dependency injection for all sprites/props.
	// That way all sprites can have a reference to the animator and canvas.
	// That will help with die() method so a sprite can remove itself from the animator.
	var Onion = function(ix, iy, w, h) {
		Sprite.call(this, ix, iy, w, h, "#FFFFFF");
	};
	Onion.prototype = new Sprite();

	Onion.prototype.update = function() {

		// super.update();
		Sprite.prototype.update.call(this);

		// Add code to twinkle?
	};
	Onion.prototype.check500 = function() {

		if (!vg.hitTestRect(this.x, this.y, this.width, this.height, 0, 0, Sprite.bWidth, Sprite.bHeight)) {
			this.reappear();
		}
	};

	Onion.prototype.warp = function() {
		this.x = 0 - this.width;
		this.y = Math.random() * Sprite.bHeight;
	};
	Onion.prototype.center = function() {
		this.width = 1;
		this.height = 1;
		this.x = Sprite.bHeight / 2;
		this.y = 10;
	};
	Onion.prototype.increase = function() {
		this.width += .25;
		this.height += .25;
	};
	// Default reappear behavior is to warp.
	Onion.prototype.reappear = Onion.prototype.warp;

	return Onion;
});