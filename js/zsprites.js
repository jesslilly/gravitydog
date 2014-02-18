console.log("zsprites.js loaded");


var Person = function(ix, iy, w, h) {
	Sprite.call(this, ix, iy, w, h);
};
Person.prototype = new Sprite();

Person.prototype.update = function(layer, sprite) {
	this.x += (Math.random() - .5) * 3;
	this.y += (Math.random() - .5) * 3;
};

Person.prototype.click = function(layer, sprite) {
	this.width -= 3;
	this.height -= 3;
};

