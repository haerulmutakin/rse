const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');


const App = express();
App.use(cors())

const httpServer = http.createServer(App);

const socketIo = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

socketIo.on('connection', (socket) => {

    socket.on('jr', (data) => {
        socket.join(data);
    })

    socket.on('sm', (data) => {
        socket.to(data.room).emit('rm', data)
    })
})

httpServer.listen(3001, () => {
    console.log('Server is running')
})