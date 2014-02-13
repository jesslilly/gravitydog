console.log("grid.js loaded");

var Grid = function(width, height, unit) {
	this.getWidth = function() {
		return width;
	};
	this.getHeight = function() {
		return height;
	};
	this.getUnit = function() {
		return unit;
	};
};
Grid.prototype.paint = function(ctx) {

	ctx.fillStyle = "black";

	// Paint vertical lines across.
	for ( var x = 0; x <= this.getWidth(); x += this.getUnit()) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, this.getHeight());
		ctx.closePath();
	    ctx.stroke();
	}
	// Paint horizontal lines down.
	for ( var y = 0; y <= this.getHeight(); y += this.getUnit()) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(this.getWidth(), y);
		ctx.closePath();
	    ctx.stroke();
	}
};