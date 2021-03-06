const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const server = http.createServer(app);
const io = socketIO(server);

let numberOfOnlineUsers = 0;
// connection
io.on('connection', (socket) => {
    numberOfOnlineUsers++;
    io.emit('numberOfOnlineUsers', numberOfOnlineUsers);
    console.log('New user connected');

    // disconnect
    socket.on('disconnect', () => {
        numberOfOnlineUsers--;
        io.emit('numberOfOnlineUsers', numberOfOnlineUsers);
        console.log('User disconnected');
    });

    // create message
    socket.on('createMessage', (message) => {
        io.emit('updateMessages', message);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});