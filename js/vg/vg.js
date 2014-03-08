console.log("loaded vg.js");

define([], function() {

	// TODO: rename this "game.js" and make it a singleton. It will have a list
	// of
	// screens and levels.
	var vg = {};
	vg.hitTest = function(px, py, rx, ry, rw, rh) {
		return (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh);
	};

	// TODO: refactor this to sprite.js. Makes sense to put the hit test
	// functions
	// there.
	vg.hitTestRect = function(sx, sy, sw, sh, rx, ry, rw, rh) {
		return vg.hitTest(sx, sy, rx, ry, rw, rh)
				|| vg.hitTest(sx + sw, sy, rx, ry, rw, rh)
				|| vg.hitTest(sx, sy + sh, rx, ry, rw, rh)
				|| vg.hitTest(sx + sw, sy + sh, rx, ry, rw, rh);
	};

	vg.isMobile = function() {
		return (('ontouchstart' in window) || window.DocumentTouch
				&& document instanceof DocumentTouch);
	};

	vg.score = 0;
	vg.scorePlus = function(points) {
		vg.score += points;
	};
	vg.getScore = function() {
		return vg.score;
	};
	vg.setScore = function(s) {
		vg.score = s;
	};
	
	return vg;
});