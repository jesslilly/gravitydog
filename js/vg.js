console.log("loaded vg.js");

var vg = {};
vg.hitTest = function(px, py, rx, ry, rw, rh) {
	return (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh);
};
