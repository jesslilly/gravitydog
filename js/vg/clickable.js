console.log("clickable.js loaded");

define([ "vg/sprite", "vg/vg" ], function(Sprite, vg) {

	var Clickable = function(ix, iy, w, h, color) {
		Sprite.call(this, ix, iy, w, h, color);

		// Sometimes we need padding around the sprite's size to make it easier
		// to click on touch screens.
		this.padding = 0;
	};
	Clickable.prototype = new Sprite();

	Clickable.prototype.setPadding = function(p) {
		this.padding = p;
	};
	Clickable.prototype.getPadding = function() {
		this.padding;
	};
	Clickable.prototype.getClickRect = function() {
		var rect = {};
		rect.x = this.x - this.padding;
		rect.y = this.y - this.padding;
		rect.width = this.width + this.padding;
		rect.height = this.height + this.padding;
		return rect;
	};
	Clickable.prototype.clickTest = function(cx, cy) {
		var rect = this.getClickRect();
		return vg.hitTest(cx, cy, rect.x, rect.y, rect.width, rect.height);
	};

	return Clickable;

});
