const mongoose = require('mongoose');
const User = require('./user.model');
const Room = require('./room.model');

const Message = mongoose.model('Message', new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.Mixed,
        ref: Room 
    },
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref: User
    },
    body: String
}, {
    timestamps: true
}));

module.exports = Message