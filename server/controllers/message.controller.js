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

setSeen = async (socket, data) => {
    await Message.updateMany({_id: {$in: data.messageIds}}, {$push: {seen_by: data.user_id}});
    emitRoom(socket, data);
}

emitRoom = async (socket, data) => {
    const room = await Room.findOne({_id: data.room_id}).populate('roomMembers').sort({'updated_at': 'desc'});
    const messages = await findLastMessageByRoomId(data.room_id);

    const {roomMembers} = room;
    const receivers = roomMembers.filter(item => item.id !== data.user_id);

    const payload = {
        id: room.id,
        receiver: receivers,
        messages: messages,
        created_at: room.created_at,
        updated_at: room.updated_at
    }
    console.log('payload', payload)
    socket.emit('get:roomupdate', payload)

}

module.exports = {
    findLastMessageByRoomId,
    findMessageByRoomId,
    addMessage,
    setSeen
};