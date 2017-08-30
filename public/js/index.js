var socket = io(); //critical to listen for events

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
       from: 'jen',
       text: 'I love cake' 
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
});