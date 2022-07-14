const mongoose = require('mongoose');
const User = require('./user.model');

const OnlineUser = mongoose.model('OnlineUser', new mongoose.Schema({
    socketId: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
}))

module.exports = OnlineUser;