const path = require('path'); // built-in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // allows us to listen and emit based on events

app.use(express.static(publicPath));

io.on('connection', (socket) => { // socket represents the individual user connected, instead of all users connected
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}); // lets you register an event listener


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
