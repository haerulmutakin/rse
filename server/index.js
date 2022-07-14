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

const addOnlineUser = (userId, socketId) => {
    const userIndex = onlineUsers.findIndex(item => item.userId === userId);
    if(userIndex >= 0) {
        onlineUsers[userIndex] = {userId: userId, socketId: socketId}
    } else {
        onlineUsers.push({userId: userId, socketId: socketId})
    }
}

const getUser = (userId) => {
    return onlineUsers.find(item => item.userId === userId)
}

const onlineUserCont = require('./controllers/online-user.controller');

socketIo.on('connection', (socket) => {

    socket.on('newOnlineUser', (data) => {
        // addOnlineUser(data.userId, socket.id);
        onlineUserCont.newOnlineUser(socket, data)
    })

    socket.on('getOnlineUser', () => {
        onlineUserCont.emitOnlineUser(socket)
    } )

    socket.on('disconnect', () => {
        onlineUserCont.removeOnlineUser(socket)
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
        console.log('Successfuly connected to mongodb')
    }
})

httpServer.listen(3001, () => {
    console.log('App is running')
})