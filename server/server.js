const path = require('path'); // built-in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // allows us to listen and emit based on events
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => { // socket represents the individual user connected, instead of all users connected
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave(params.room);

        // io.emit                  this emits to everyone connected
        // socket.broadcast.emit    this sends it to everyone connected except the current user
        // socket.emit              this emits an event specific to one user

        // io.emit                  -> io.to(params.room).emit
        // socket.broadcast.emit    -> socket.broadcast.to(params.room).emit
        // socket.emit              xx no reason to specify by room bc we are sending it to a specific user

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);
        
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
            

        }
    });
}); // lets you register an event listener


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
