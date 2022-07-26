const ResponseSchema = require('../_utils/response-body.util');
const Message = require('../models/message.model');

findLastMessageByRoomId = async (roomId) => {
    const messageData = await Message.findOne({room: roomId}).select('_id, sender, body').sort({'createdAt': 'desc'}).populate('sender');
    return messageData;
}

findMessageByRoomId = async (req, res) => {
    const {params} = req;
    const messages = await Message.find({room: params.id})
    res.send(ResponseSchema.list(messages));
}

addMessage = async (socket, data) => {
    const messageData = new Message(data);
    messageData.save();
}

module.exports = {
    findLastMessageByRoomId,
    findMessageByRoomId,
    addMessage
};