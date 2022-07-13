const http = require('http');
const {Server} = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parser = require('body-parser');
const appRoutes = require('./routes')

const App = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

App.use(cors(corsOptions));
App.use(parser.json());
App.use(parser.urlencoded({extended: true}));

App.use('/api/v1', appRoutes)

const httpServer = http.createServer(App);



const socketIo = new Server(httpServer,  {
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
})

mongoose.connect('mongodb://localhost:27017/react-socket-node', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Successfully connected to mongodb')
    }
})

httpServer.listen(3001, () => {
    console.log('App is running')
})