const ResponseSchema = require('../_utils/response-body.util');
const Message = require('../models/message.model');
const Room = require('../models/room.model');

findLastMessageByRoomId = async (roomId) => {
    const messageData = await Message.find({room: roomId}).sort({'createdAt': 'asc'}).populate('sender');
    return messageData;
}

findMessageByRoomId = async (req, res) => {
    const {params} = req;
    const messages = await Message.find({room: params.id})
    res.send(ResponseSchema.list(messages));
}

addMessage = async (socket, data) => {
    const messageData = new Message(data);
    await messageData.save();

    await Room.findOneAndUpdate({_id: messageData.room}, {updated_at: Date.now()});

    const newMessage = await Message.findOne({_id: messageData._id}).populate('sender');

    socket.to(messageData.room).emit('new:roommessage', newMessage);

}

module.exports = {
    findLastMessageByRoomId,
    findMessageByRoomId,
    addMessage
};