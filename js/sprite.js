console.log("sprite.js loaded");

var Sprite = (function() {

	var Sprite = function(ix, iy, w, h) {
		this.x = ix;
		this.y = iy;
		this.width = w;
		this.height = h;
		this.clickable = false;
		this.color = "rgb(40," + Math.round(Math.random() * 256) + ",80)";
	};

	Sprite.prototype.update = function(layer, sprite) {
		this.x++;
		this.y += Math.random();
	};

	Sprite.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
	Sprite.prototype.setClickable = function(c) {
		this.clickable = c;
	};
	Sprite.prototype.isClickable = function() {
		return this.clickable;
	};

	return Sprite;
})();
