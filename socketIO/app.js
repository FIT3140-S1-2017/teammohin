var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
	//send the index.html file for all requests
	res.sendFile(__dirname + '/index.html');
});

http.listen(3001, function () {
	console.log('listening on *:3001');
});

io.on('connection', function (socket) {
	console.log('Get a connection');
  	socket.on('from-client', function (msg) {
	    	setTimeout(function () {
	      		var serverBid = parseInt(msg) + Math.round(Math.random() * 10);
	      		socket.emit('from-server', serverBid);
	      		console.log('Client bid=' + msg + '    server bid=' + serverBid);
    		}, 500);
	});
});
