var socket = io();

var form = document.getElementById('form'); // Get data from form
var input = document.getElementById('input'); // Get onlick from state
var message = document.getElementById('message');
form.addEventListener('submit', function (e) {
	e.preventDefault();
	if (input.value) {
		socket.emit('chat message', input.value);
		input.value = '';
	}
});

socket.once('chat message', function (msg) {
	var item = document.createElement('li');
	item.textContent = msg;
	message.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});
