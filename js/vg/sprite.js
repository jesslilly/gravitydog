console.log("sprite.js loaded");

define([ "vg/prop" ], function(Prop) {

	var Sprite = function(ix, iy, w, h, color) {
		Prop.call(this, ix, iy, w, h, color);

		// Velocity
		this.vx = 0;
		this.vy = 0;
		this.speed = 0;
		this.dir = 0;
	};

	Sprite.prototype = new Prop();

	Sprite.prototype.update = function(layer, sprite) {
		this.x += this.vx;
		this.y += this.vy;
	};

	Sprite.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width,
				this.height);
	};
	Sprite.prototype.setVelocity = function(vx, vy) {
		this.vx = vx;
		this.vy = vy;
	    this.speed = Math.sqrt(vx * vx + vy * vy);
	};
	Sprite.prototype.setVector = function(dir, speed) {
		var vel = Sprite.vectorToVelocity(dir, speed);
		this.vx = vel.vx;
		this.vy = vel.vy;
		this.dir = dir;
		this.speed = speed;
	};
	// Assign this method to a sprite update function to make it oscillate.
	Sprite.prototype.vOscillate = function() {
		if (!this.oscillateOffset) {
			this.oscillateOffset = 0;
		}
		this.oscillateOffset += 4; // 4 degrees.

		// Normal update.
		this.x += this.vx;
		this.y += this.vy + Math.sin(this.oscillateOffset * Math.PI / 180);
	};
    //// Assign this method to a sprite update function to make it oscillate.
	//Sprite.prototype.oscillateBox = function () {
	//    if (!this.oscillateOffset) {
	//        this.oscillateOffset = 0;
	//    }
	//    this.oscillateOffset += 4; // 4 degrees.

	//    this.width = this.width + Math.sin(this.oscillateOffset * Math.PI / 180);
	//    this.height = this.height - Math.sin(this.oscillateOffset * Math.PI / 180);
    //};

    // Assign this method to a sprite update function to make it oscillate.
	Sprite.prototype.iconJump = function (jumpHeight) {
	    if (!this.oscillateOffset) {
	        this.oscillateOffset = 0;
	    }
	    if (!this.baseLineY) {
	        this.baseLineY = this.y;
	    }
	    this.oscillateOffset += 4; // 4 degrees.

	    var offset = -Math.sin(this.oscillateOffset * Math.PI / 180) * jumpHeight;
	    if (this.y - offset < this.baseLineY) {
	        this.y = this.baseLineY - offset;
	    }
	};

	Sprite.vectorToVelocity = function(degrees, speed) {
		var pair = {};
		var radians = degrees * Math.PI / 180;
		pair.vy = speed * Math.sin(radians);
		pair.vx = speed * Math.cos(radians);
		//console.log(degrees + " degrees @ " + speed + "=(" + pair.vx + ","
		//		+ pair.vy + ")");
		return pair;
	};

	Sprite.prototype.moveForward = function (frames) {
	    this.x = this.x + (this.vx * frames);
	    this.y = this.y + (this.vy * frames);
	};

	// b for boundary.
	Sprite.bWidth = 100;
	Sprite.bHeight = 100;
	

	return Sprite;
});
