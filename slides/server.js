var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	fs = require('fs');

var state = 0, clients = [];

app.use(express['static'](__dirname));

io.sockets.on('connection', function(socket) {
	clients.push(socket);
});
io.set('log level', 1);

// app.get('/advance', function(req, res) {
//  res.sendfile(__dirname + '/index.html');
// });

function send(message) {
  // Iterate through all potential clients
  clients.forEach(function(client) {
    client.send(JSON.stringify(message));
  });
}

// Advance
app.get('/vor', function(req, res) {
	// Increment and send over socket
	state++;
	send({state: 'slide-' + state});
	res.send(state.toString());
});

// Force Sync
app.get('/seit/:state', function(req, res) {
	state = req.params.state;
	// set and send over socket
	send({state: 'slide-' + state});
	res.send(state.toString());
});

// Backwards
app.get('/ruck', function(req, res) {
	// Decrement and send over socket
	state--;
	send({state: 'slide-' + state});
	res.send(state.toString());
});

server.listen(1978);