console.log("elevader.js loaded");

(function() {
	var canvas = document.getElementById('board');
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect (0, 0, canvas.width, canvas.height);
    
    var grid = new Grid(canvas.width, canvas.height, 10);
    grid.paint(ctx);
    
})();