const mongoose = require('mongoose');
const User = require('./user.model');

const Room = mongoose.model('Room', new mongoose.Schema({
    roomMembers: [{
        type: mongoose.Schema.Types.Mixed,
        ref: User
    }]
}, {
    timestamps: true
}));

module.exports = Room;