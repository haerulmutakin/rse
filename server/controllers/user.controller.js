const ResponseSchema = require('../_utils/response-body.util');
const User = require('../models/user.model');
const Room = require('../models/room.model');

findUser = async (req, res) => {
    const qParams = req.query;
    const {username} = qParams;
    
    const users = await User.findOne({username: username});
    
    res.send(ResponseSchema.list(users));
}

findUsersButMe = async (req, res) => {
    const params = req.query;

    const friends = await User.find({_id: {$ne: params.user_id}});

    const payload = [];
    for(let friend of friends) {
        const room = await getRooms(params.user_id, friend.id);
        
        payload.push({
            id: friend.id,
            name: `${friend.firstName} ${friend.lastName}`,
            room_id: room?.id || 'none'
        })
    }
    res.send(ResponseSchema.list(payload));
}

getRooms = async (user_id, friend) => {
    return new Promise(async (resolve) => {
        const data = await Room.findOne({roomMembers: {$in: user_id}, roomMembers: {$in: friend}});
        resolve(data)
    });
}

module.exports = {
    findUser,
    findUsersButMe
}