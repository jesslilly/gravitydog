console.log("spacedog.js loaded");

define([ "vg/vg", "vg/animator", "vg/clickable", "vg/prop", "vg/sprite", "spacepuppy" ], function(vg, Animator, Clickable, Prop, Sprite, SpacePuppy) {

    // TODO: Implement factor pattern with dependency injection for all sprites/props.
    // That way all sprites can have a reference to the animator and canvas.
    // That will help with die() method so a sprite can remove itself from the animator.
	var SpaceDog = function(ix, iy, w, h, gameOverCb) {
	    SpacePuppy.call(this, ix, iy, w, h, gameOverCb);
	};
	SpaceDog.prototype = new SpacePuppy();

	SpaceDog.prototype.floatInPlace = function() {
		this.vOscillate(3);
	};

	SpaceDog.prototype.drift = function() {
		// Call super method.
		Sprite.prototype.update.call(this);
	};

	// Initial "update" is just sitting there and oscillating.
	SpaceDog.prototype.update = SpaceDog.prototype.floatInPlace;

	SpaceDog.prototype.clickBegin = function() {

	    SpacePuppy.prototype.clickBegin.call(this);

		// Remove vOscillate at a certain speed since you can't see it
		// anyway.
		// Performance.
		if (this.speed > 3) {
			this.update = SpaceDog.prototype.drift;
		}

		// Shrink
		//if (this.width > 50) {
		//	this.width -= 2;
		//	this.height -= 1.5;
		//}
	};
	
	return SpaceDog;

});
