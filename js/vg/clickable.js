console.log("clickable.js loaded");

define([ "vg/sprite", "vg/vg" ], function(Sprite, vg) {

	var Clickable = function(ix, iy, w, h, color) {
		Sprite.call(this, ix, iy, w, h, color);

		// Sometimes we need padding around the sprite's size to make it easier
		// to click on touch screens.
		this.padding = 0;
		this.isShrunk = false;
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
	Clickable.prototype.clickBegin = function() {
		this.shrink(.75);
		console.log("Assign a clickBegin method!");
	};
	Clickable.prototype.clickEnd = function() {
		// TODO: Make it so you don't have to call unshrink yourself if you override clickEnd.
		this.unshrink(.75);
		console.log("Assign a clickEnd method!");
	};

	Clickable.prototype.shrink = function() {
		if (this.isShrunk) {
			return;
		}

		var shrinkBy = .75 // 75%
		this.height = this.height * shrinkBy;
		this.width = this.width * shrinkBy;
		this.isShrunk = true;
	};

	Clickable.prototype.unshrink = function() {
		if (!this.isShrunk) {
			return;
		}

		var shrinkBy = .75 // 75%
		this.height = this.height / shrinkBy;
		this.width = this.width / shrinkBy;
		this.isShrunk = false;
	};

	return Clickable;

});
