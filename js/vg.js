console.log("loaded vg.js");

var vg = {};
vg.hitTest = function(px, py, rx, ry, rw, rh) {
	return (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh);
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