const express = require('express');
const socketio = require('socket.io');
const path = require('path'); // Module used for pathing and joining, may need at some point
const http = require('http'); // We need http to run upfront rather than under the hood inorder to use http methods

const PORT = 3000 || process.env.PORT;
const app = express();
const server = http.createServer(app); // Create server app upfront to use
const io = socketio(server);

// Set work directory
app.use(express.static(__dirname + '/public'));

//add route to hom page
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/rooms.html'));
});

// Turn on socket when front end connection inits
io.on('connection', (socket) => {
	console.log('New Connection');

	socket.emit('message', 'Welcome to Chat');

	socket.broadcast.emit('message', 'A user has joined the chat');

	socket.on('disconnect', () => {
		io.emit('messages', 'A user has left the chat');
		console.log('A user disconnected');
	});

	io.on('connection', (socket) => {
		socket.on('chat message', (msg) => {
			io.emit('chat message', msg);
		});
	});
});

server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/`));
