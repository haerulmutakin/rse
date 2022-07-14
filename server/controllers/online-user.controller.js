const OnlineUser = require('../models/online-user.model');

exports.newOnlineUser = async (socket, data) => {
    data.socketId = socket.id;

    await OnlineUser.findOneAndUpdate({userId: data.userId}, {socketId: socket.id}, {upsert: true, new: true, setDefaultsOnInsert: true} )
    emitOnlineUser(socket);
}

exports.removeOnlineUser = async (socket) => {
    await OnlineUser.deleteOne({socketId: socket.id});
    emitOnlineUser(socket);
}

emitOnlineUser = async (socket) => {
    const onlineUsers = await OnlineUser.find();
    socket.broadcast.emit('update_online_user', onlineUsers);
    socket.emit('update_online_user', onlineUsers);
}