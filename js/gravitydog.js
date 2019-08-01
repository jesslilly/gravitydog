console.log("main.js loaded");

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js');
  }

require([ "vg/vg", "vg/animator", "vg/clickable", "vg/prop", "vg/sprite", "spacepuppy", "spacedog", "star" ], function(vg, Animator, Clickable, Prop, Sprite, SpacePuppy, SpaceDog, Star) {

	var sprites = document.getElementById("sprites");
	var canvas = document.getElementById('canvas');
	var aGoodScore = (window.location.port === "40001") ? 10 : 30;
	var bugzModeScore = (window.location.port === "40001") ? 15 : 100;

	// var ad = document.getElementsByClassName('gravity-dog-ad')[0];

	if (!canvas.getContext) {
		alert("Shucks!  Try a different browser please?");
	}

	var ctx = canvas.getContext('2d');
	/* http://stackoverflow.com/questions/7615009/disable-interpolation-when-scaling-a-canvas */
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;

	var a = null;
	var startBanner = null;

	var main = function () {

	    addResizeHandler();

	    // Create an animator. Refresh at 17ms which is 60Hz.
		a = new Animator(ctx, 17, 1);

	    setCanvasSize();

		Sprite.bWidth = canvas.width;
		Sprite.bHeight = canvas.height;
		introScreen();
    };

    var setCanvasSize = function() {
	    // Resize the canvas to a square that fits in the viewport.
		var vpw = verge.viewportW();
		var vph = verge.viewportH();
		var orientation = (vpw > vph) ? "landscape": "portrait";
		var smaller = (vpw > vph) ? vph: vpw;

	    // Don't change the canvas size programatically. I want the canvas to
	    // always be the same so point, 10,10 is always the same. What changes
	    // is the
	    // CSS w/h to scale the entire canvas to fit the actual screen size.
	    // canvas.width = smaller;
	    // canvas.height = smaller;

        // Viewport will expant via the viewport meta tag (Mobile)
        // OR this code right here. (Desktops)
		if (vpw > 480 || vph > 480) {
		    canvas.style.width = smaller + "px";
		    canvas.style.height = smaller + "px";
		    canvas.style.background = '#000000';
		    if (orientation === "landscape") {
		        document.getElementById('content').style.height = smaller + "px";
		        document.getElementById('content').style.width = (smaller * 1.5) + "px";
		    } else {
			        document.getElementById('content').style.width = smaller + "px";
			        document.getElementById('content').style.height = (smaller * 1.5) + "px";
		    }
	        /* http://stackoverflow.com/questions/7791286/getting-correct-mouse-position-on-canvas-when-canvas-size-is-relative */
		    var newScaleFactor = canvas.width / smaller;
		    a.setScaleFactor(newScaleFactor);
		}
    }

    var resizeHandler = function(event) {
        setCanvasSize();
    };

    var addResizeHandler = function() {
        if (window.addEventListener) {
            window.addEventListener("resize", resizeHandler, false);
        } else if (window.attachEvent) {
            window.attachEvent("onresize", resizeHandler);
        }
    };

	var introScreen = function() {
		a.clear();

		// Draw background.
		var bg = new Prop(0, 0, canvas.width, canvas.height, "#000000");
		a.add(0, bg);

	    // Add star field!
        for (var idx = 0; idx < 30; idx++) {
            var star = new Star(canvas.width / 2, 10, 2, 2, "#FFFFFF");
            star.setVector(Math.random() * 180, (Math.random()) +.1);
            star.reappear = function() {
                this.setVector(Math.random() * 180, (Math.random()) + .1);
                this.center();
            };
            if (idx < 20) {
                star.update500 = function() {
                    // Accelerate
                    this.setVelocity(this.vx *= 1.2, this.vy *= 1.2);
                    // And get bigger proportonal to speed.
                    this.width += (this.width * this.speed > 1.5) ? .5 : 0;
                    this.height += (this.height * this.speed > 1.5) ? .5 : 0;
                };
            } else {
                // Some stars are slow/small.
                star.update500 = function () {};
            }
            // Spread the stars out from the center.
            var distance = Math.random() * canvas.width / 2;
            star.x += star.vx * distance;
            star.y += star.vy * distance;

            a.add(0, star);
        }

	    // Title
        var gravity = new Prop(-20, 20, 175 * 3, 55 * 3);
        gravity.currentAngle = 0;
	    gravity.clockWise = true;
	    gravity.draw = function (ctx) {
	        var offSetX = canvas.width / 2;
	        var offSetY = 50;
	        ctx.save();
	        ctx.translate(offSetX, offSetY);
	        ctx.rotate(this.currentAngle * Math.PI / 180);
	        ctx.drawImage(sprites, 0, 210, 175, 55, this.x - offSetX, this.y - offSetY, this.width, this.height);
	        ctx.restore();
	    };
	    gravity.update = function () {
	        if (Math.abs(this.currentAngle) > 5) {
	            this.clockWise = !this.clockWise;
	        }
	        this.currentAngle += this.clockWise ? .03 : -.03;
	    };
	    a.add(2, gravity);
	    var dog = new Prop(110, 150, 110 * 2.5, 47 * 2.5);
	    dog.draw = function (ctx) {
	        ctx.drawImage(sprites, 0, 267, 110, 47, this.x, this.y, this.width, this.height);
	    };
	    a.add(1, dog);

		// play Button
		var play = new Clickable(140, 230, 60 * 2, 60 * 2);
		play.draw = function(ctx) {
			ctx.drawImage(sprites, 132, 40, 30, 30, this.x, this.y, this.width, this.height);
		};
		play.clickEnd = function() {
			newGame();
		};
	    play.update = function() {
	        this.iconJump(25);
	    };
		a.add(2, play);

		var japanese = new Prop(110, 390, 52 * 2, 17 * 2);
		japanese.draw = function (ctx) {
		    ctx.drawImage(sprites, 119, 113, 52, 17, this.x, this.y, this.width, this.height);
		};
		a.add(2, japanese);

		var spaceDog = new Clickable(240, 200, 118 * 5, 88 * 5);
		spaceDog.draw = function (ctx) {
		    ctx.drawImage(sprites, 0, 0, 118, 88, this.x, this.y, this.width, this.height);
		};
	    spaceDog.update = function() {
	        this.vOscillate(1);
	    };
		a.add(2, spaceDog);

		a.go();
	};

	var newGame = function() {
		a.clear();
		vg.setScore(0);
		level1Sprites();
		addScore();
		a.go();
	};

	var level1Sprites = function() {

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Draw background.
		var bg = new Sprite(0, 0, canvas.width, canvas.height, "#000000");
		bg.update = function() {
		};
		a.add(0, bg);
		// Go into buggy animation level when you get a nice high score.
		// TODO: Improve efficiency by moving this check to SpaceDog.clickBegin.
		a.customAnimationHook = function() {
		    if (vg.getScore() >= bugzModeScore) {

		        var words = new Prop(-12, 80, 0, 0);
		        words.draw = function (ctx) {
		            var msg = "<p>BugzMode!</p>";
		            ctx.font = "20pt monospace";
		            ctx.fillStyle = "black";
		            ctx.fillText(msg, this.x, this.y);
		            ctx.fillStyle = "white";
		            ctx.fillText(msg, this.x + 2, this.y + 2);
		        };
		        a.add(2, words);
		        var wordsBg = new Prop(-40, 70, 560, 40, "cyan");
		        a.add(0, wordsBg);

				bg.draw = function() {
				};
		        a.customAnimationHook = function() {};
		    }
		};

		// Add star field!
		for ( var idx = 0; idx < 10; idx++) {
			var star = new Star(Math.random() * canvas.width, Math.random() * canvas.height, 3, 3);
			star.setVelocity((Math.random() * 1.5) + 1, 0);
			a.add(0, star);
		}

		// Add the earth!
		var earth = new Star(Math.random() * canvas.width, Math.random() * canvas.height, 114, 114);
		earth.x -= earth.width / 2;
		earth.y -= earth.height / 2;
		earth.setVelocity(.5, 0);
		earth.draw = function(ctx) {
			ctx.drawImage(sprites, 0, 93, 114, 114, this.x, this.y, this.width, this.height);
		};
		a.add(1, earth);

	    // Add the dog!
	    SpacePuppy.dogCount = 0;
		var dog = new SpaceDog(200, 200, 118 * 1.5, 88 * 1.5, gameOver);
		// dog.setVector(45, 1);
		// TODO: Move images to the Sprite class.
		dog.draw = function(ctx) {
			ctx.drawImage(sprites, 0, 0, 118, 88, this.x, this.y, this.width, this.height);
		};
		dog.clickBegin = function() {
		    SpaceDog.prototype.clickBegin.call(this);
		    startBanner.msg = "KEEP TAPPING!";
			startBanner.setVelocity(5, 0);

            // If the score is a square...
		    var squareOfScore = Math.sqrt(vg.getScore() - 5);
            if (squareOfScore === Math.ceil(squareOfScore)) {
                // Add a puppy!
                var puppy = new SpacePuppy(dog.x, dog.y, 48 * 2, 44 * 2, gameOver);
		        puppy.draw = function(ctx) {
			        ctx.drawImage(sprites, 0, 315, 48, 44, this.x, this.y, this.width, this.height);
			    };
		        puppy.aboutFace();
                puppy.moveForward(50);
                a.add(1, puppy);
                // Stop the main dog.
                dog.setVelocity(0, 0);
                dog.update = dog.floatInPlace;
            }
		};
		a.add(1, dog);
	};

	var addScore = function() {

		// Score Icon
		var scoreIcon = new Prop(10, 10, 29, 29);
		scoreIcon.draw = function(ctx) {
			ctx.drawImage(sprites, 133, 8, 29, 29, this.x, this.y, this.width, this.height);
		};
		a.add(2, scoreIcon);

		// Score board
		var score = new Prop(45, 38, 0, 0);
		score.draw = function(ctx) {
			ctx.font = "32pt silkscreennormal";
			ctx.fillStyle = "white";
			ctx.fillText(vg.getScore() + "", this.x, this.y);
		};
		a.add(2, score);

		// Score bg, so bugz mode does not affect score.
		var bg = new Prop(4, 4, 180, 40, "black");
		a.add(0, bg);

		// levelBanner
		startBanner = new Sprite(50, 150, 0, 0);
	    startBanner.msg = "TAP THE DOG";
		startBanner.draw = function(ctx) {
			ctx.font = "32pt silkscreennormal";
			ctx.fillStyle = "black";
			ctx.fillText(this.msg, this.x, this.y);
			ctx.fillStyle = "white";
			ctx.fillText(this.msg, this.x + 2, this.y + 2);
		};
		a.add(2, startBanner);

		// URL
		var url = new Prop(200, 480 - 10, 0, 0);
		url.draw = function(ctx) {
			ctx.font = "16pt Arial";
			ctx.fillStyle = "rgba(225, 225, 225, 1)";
			ctx.fillText("sparkyland.com/gravitydog", this.x, this.y);
		};
		a.add(1, url);

	};

	var gameOver = function () {

		// Popup
		var popup = new Prop(120, 120, 240, 160, "rgba(255, 255, 255, .65)");
		a.add(2, popup);

		// Words
		var popup = new Prop(125, 125, 230, 50, "#33DD44");
		a.add(2, popup);
		var words = new Prop(130, 160, 0, 0);
		words.draw = function(ctx) {
		    var msg = (vg.getScore() >= aGoodScore)
                ? "Nice JOB!" : "Keep try!";
			ctx.font = "30pt silkscreennormal";
			ctx.fillStyle = "black";
			ctx.fillText(msg, this.x, this.y);
			ctx.fillStyle = "white";
			ctx.fillText(msg, this.x + 2, this.y + 2);
		};
		a.add(2, words);

		// Home Button
		var home = new Clickable(160, 200, 60, 60);
		home.draw = function(ctx) {
			ctx.drawImage(sprites, 132, 74, 30, 30, this.x, this.y, this.width, this.height);
		};
		home.clickEnd = function() {
			introScreen();
		};
		a.add(2, home);

		// Play Button
		var play = new Clickable(260, 200, 60, 60);
		play.draw = function(ctx) {
			ctx.drawImage(sprites, 132, 40, 30, 30, this.x, this.y, this.width, this.height);
		};
		play.clickEnd = function() {
			newGame();
		};
		a.add(2, play);
	};

	main();

});