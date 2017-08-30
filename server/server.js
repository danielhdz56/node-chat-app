const path = require('path'); // built-in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // allows us to listen and emit based on events

app.use(express.static(publicPath));

io.on('connection', (socket) => { // socket represents the individual user connected, instead of all users connected
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'daniel',
        text: 'I am so cool',
        createdAt: 111
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}); // lets you register an event listener


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
