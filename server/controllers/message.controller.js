const ResponseSchema = require('../_utils/response-body.util');
const Message = require('../models/message.model');

exports.getMessageByRoom = async (req, res) => {
    const params = req.query;
    const messages = await Message.find({room: params.room_id}).populate('user');
    res.send(ResponseSchema.list(messages))
}

exports.addMessage = async (socket, data) => {
    const messageData = new Message(data);
    await messageData.save();
    emitNewMessage(socket, messageData)
}

exports.getLastMessage = async (req, res) => {
    const params = req.query;
    const messages = await Message.findOne({room: params.room_id}, {}, { sort: { 'createdAt' : -1 } }).populate('user');
    res.send(messages)
}

emitNewMessage = async (socket, data) => {
    const message = await Message.findOne({_id: data._id}).populate('user')
    if(message) {
        socket.emit('get:newmessage', message)
        socket.to(message.room).emit('get:newmessage', message)
    }
}