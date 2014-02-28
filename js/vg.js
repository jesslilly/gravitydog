console.log("loaded vg.js");

var vg = {};
vg.hitTest = function(px, py, rx, ry, rw, rh) {
	return (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh);
};

vg.hitTestRect = function(sx, sy, sw, sh, rx, ry, rw, rh) {
	return vg.hitTest(sx, sy, rx, ry, rw, rh)
		|| vg.hitTest(sx + sw, sy, rx, ry, rw, rh)
		|| vg.hitTest(sx, sy + sh, rx, ry, rw, rh)
		|| vg.hitTest(sx +sw, sy + sh, rx, ry, rw, rh);
};

vg.isMobile = function() {
	return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
};

vg.score = 0;
vg.scorePlus = function(points) {
	vg.score += points;
};
vg.getScore = function() {
	return vg.score;
};