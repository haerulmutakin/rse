const mongoose = require('mongoose');
const User = require('./user.model');
const Room = require('./room.model');

const Message = mongoose.model('Message', new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.Mixed,
        ref: Room 
    },
    sender: {
        type: mongoose.Schema.Types.Mixed,
        ref: User
    },
    seen_by: [{
        type: mongoose.Schema.Types.Mixed,
        ref: User
    }],
    body: {
        type: String
    }
}, {
    timestamps: true
}))

module.exports = Message;