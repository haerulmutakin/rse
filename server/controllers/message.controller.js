const Message = require('../models/message.model');

findLastMessageByRoomId = async (roomId) => {
    const messageData = await Message.findOne({room: roomId}).select('_id, sender, body').sort({'createdAt': 'desc'}).populate('sender');
    return messageData;
}

module.exports = {findLastMessageByRoomId};