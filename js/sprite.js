console.log("sprite.js loaded");

var Sprite = (function() {

	var Sprite = function(ix, iy, w, h, color) {
		this.x = ix;
		this.y = iy;
		this.width = w;
		this.height = h;
		this.clickable = false;
		
		// rgba(255, 255, 0, .5) or "#00A308"
		this.color = color;
		// Velocity
		this.vx = 0;
		this.vy = 0;
		this.speed = 0;
		this.dir = 0;
	};

	Sprite.prototype.update = function(layer, sprite) {
		this.x += this.vx;
		this.y += this.vy;
	};

	Sprite.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width,
				this.height);
	};

	Sprite.prototype.setClickable = function(c) {
		this.clickable = c;
	};
	Sprite.prototype.setVelocity = function(vx, vy) {
		this.vx = vx;
		this.vy = vy;
		this.speed = null; // For speed, don't calc it.
	};
	Sprite.prototype.setVector = function(dir, speed) {
		var vel = Sprite.vectorToVelocity(dir, speed);
		this.vx = vel.vx;
		this.vy = vel.vy;
		this.dir = dir;
		this.speed = speed;
	};
	Sprite.prototype.isClickable = function() {
		return this.clickable;
	};

	return Sprite;
})();

Sprite.vectorToVelocity = function(degrees, speed) {
	var pair = {};
	var radians = degrees * Math.PI / 180;
	pair.vy = speed * Math.sin(radians);
	pair.vx = speed * Math.cos(radians);
	console.log(degrees + " degrees @ " + speed + "=(" + pair.vx + "," + pair.vy
			+ ")");
	return pair;
};

// b for boundary.
Sprite.bWidth = 100;
Sprite.bHeight = 100;
