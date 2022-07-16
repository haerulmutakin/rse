const Room = require('../models/room.model');

exports.findRoom = async (req, res) => {
    const params = req.query;

    const data = await Room.find({roomId: params.userId}).populate('roomId')
    res.send(data)
}

exports.addRoom = async (req, res) => {
    const body = req.body;
    const {room_id} = body;
    const roomIds = room_id.split(',');
    
    const roomData = new Room();
    roomData.roomId = roomIds;
    const data = await roomData.save();
    
    res.send(data)
}