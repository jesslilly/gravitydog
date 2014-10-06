console.log("spacedog.js loaded");

define([ "vg/vg", "vg/animator", "vg/clickable", "vg/prop", "vg/sprite", "spacepuppy" ], function(vg, Animator, Clickable, Prop, Sprite, SpacePuppy) {

    // TODO: Implement factor pattern with dependency injection for all sprites/props.
    // That way all sprites can have a reference to the animator and canvas.
    // That will help with die() method so a sprite can remove itself from the animator.
	var SpaceDog = function(ix, iy, w, h, deathCb) {
	    SpacePuppy.call(this, ix, iy, w, h, deathCb);
	};
	SpaceDog.prototype = new SpacePuppy();

	SpaceDog.prototype.update1 = function() {
		this.vOscillate(3);
	};

	SpaceDog.prototype.update2 = function() {
		// Call super method.
		Sprite.prototype.update.call(this);
	};

	// Initial "update" is just sitting there and oscillating.
	SpaceDog.prototype.update = SpaceDog.prototype.update1;

	SpaceDog.prototype.click = function() {

	    SpacePuppy.prototype.click.call(this);

		// Remove vOscillate at a certain speed since you can't see it
		// anyway.
		// Performance.
		if (this.speed > 3) {
			this.update = SpaceDog.prototype.update2;
		}

		// Shrink
		//if (this.width > 50) {
		//	this.width -= 2;
		//	this.height -= 1.5;
		//}
	};
	
	return SpaceDog;

});
