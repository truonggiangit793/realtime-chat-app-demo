const express = require("express")
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server)
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/public/index.html")
})
var clients = 0;
app.use(express.static('public'));

socket.on("connection", (client) => {
    clients++
    socket.sockets.emit('broadcast', { description: clients + ' clients connected!'});
    client.on("join", (data) => {
        console.log(data)
    })
    client.on('messages', (data) => {
        client.emit('thread', data)
        client.broadcast.emit('thread', data)
    })
    client.on('disconnect', function () {
        clients--;
        socket.sockets.emit('broadcast', { description: clients + ' clients connected!' });
    });
})

server.listen(3000, () => {
    console.log('server is running')
})