var express = require('express');
var http = require('http');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 40001);

	// app.use is processed in sequence meaning the order of these calls
	// is important!
	app.use(express.favicon(__dirname + '/img/favicon.ico'));
	app.use(express.static(__dirname));
});

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
