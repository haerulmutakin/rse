const OnlineUser = require('../models/online-user.model');

addOnlineUser = async (socket, data) => {
    data.socketId = socket.id;

    await OnlineUser.findOneAndUpdate({userId: data.user_id}, {socketId: socket.id}, {upsert: true, new: true, setDefaultsOnInsert: true} )
    emitOnlineUser(socket);
}

removeOnlineUser = async (socket) => {
    await OnlineUser.deleteOne({socketId: socket.id});
    emitOnlineUser(socket);
}

emitOnlineUser = async (socket) => {
    const onlineUsers = await OnlineUser.find();
    socket.broadcast.emit('get:online', onlineUsers);
    socket.emit('get:online', onlineUsers);
}

module.exports = {addOnlineUser, removeOnlineUser}