const ResponseSchema = require('../_utils/response-body.util');
const Room = require('../models/room.model');
const MessageController = require('./message.controller');

findRoom = async (req, res) => {
    const {params} = req;
    const data = await Room.findOne({_id: params.id}).populate('roomMembers');
    res.send(ResponseSchema.list(data))
}

findUserRooms = async (req, res) => {
    const params = req.query;
    const {user_id} = params;

    const rooms = await Room.find({roomMembers: user_id}).populate('roomMembers').sort({'updated_at': 'desc'});

    const payload = [];
    for (let room of rooms) {
        const {roomMembers} = room;
        const receivers = roomMembers.filter(item => item.id !== user_id);

        const messages = await getMessages(room.id);
        if(messages.length > 0) {
            payload.push({
                id: room.id,
                receiver: receivers,
                messages: messages,
                created_at: room.created_at,
                updated_at: room.updated_at
            })
        }
    }

    res.send(ResponseSchema.list(payload))

}

getMessages = async (roomId) => {
    return new Promise(async (resolve) => {
        const messageData =  await MessageController.findLastMessageByRoomId(roomId);
        resolve(messageData)
    });
}

addRoom = async (req, res) => {
    const data = {
        roomMembers: req.body.roomMembers,
        created_at: Date.now(),
        updated_at: Date.now(),
    }

    const roomData = new Room(data);
    await roomData.save();

    res.send(ResponseSchema.list(roomData));
}

module.exports = {findRoom, findUserRooms, addRoom};