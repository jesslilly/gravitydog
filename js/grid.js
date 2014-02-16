console.log("grid.js loaded");

var Grid = (function() {
	var width = 0;
	var height = 0;
	var unit = 0;

	var Grid = function(w, h, u) {
		width = w;
		height = h;
		unit = u;
	};

	console.log("declare grid functions.");
	Grid.prototype.getWidth = function() {
		return width;
	};
	Grid.prototype.getHeight = function() {
		return height;
	};
	Grid.prototype.getUnit = function() {
		return unit;
	};
	Grid.prototype.draw = function(ctx) {

		ctx.strokeStyle = "white";

		// draw vertical lines across.
		for ( var x = 0; x <= width; x += unit) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.closePath();
			ctx.stroke();
		}
		// draw horizontal lines down.
		for ( var y = 0; y <= height; y += unit) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.closePath();
			ctx.stroke();
		}
	};
	return Grid;
})();
