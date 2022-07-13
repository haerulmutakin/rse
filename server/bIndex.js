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

const onlineUsers = [];

const addOnlineUser = (username, socketId) => {
    const userIndex = onlineUsers.findIndex(item => item.username === username);
    if(userIndex >= 0) {
        onlineUsers[userIndex] = {username: username, socketId: socketId}
    } else {
        onlineUsers.push({username: username, socketId: socketId})
    }
}

const getUser = (username) => {
    return onlineUsers.find(item => item.username === username)
}

socketIo.on('connection', (socket) => {

    socket.on('newOnlineUser', (data) => {
        addOnlineUser(data.username, socket.id);
    })

    socket.on('like', ({receiver, sender}) => {
        const user = getUser(receiver);
        if(user) {
            socket.to(user.socketId).emit('like', `${sender} likes your quote`)
        }
    })

    socket.on('sm', (data) => {
        socket.to(data.room).emit('rm', data)
    })
})

httpServer.listen(3001, () => {
    console.log('Server is running')
})