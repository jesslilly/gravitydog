console.log("prop.js loaded");

define([], function() {

	var Prop = function(ix, iy, w, h, color) {
		this.x = ix;
		this.y = iy;
		this.width = w;
		this.height = h;

		// rgba(255, 255, 0, .5) or "#00A308"
		this.color = color;
	};

	Prop.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width,
				this.height);
	};
	return Prop;

});
