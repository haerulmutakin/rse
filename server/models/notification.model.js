const mongoose = require('mongoose');
const User = require('./user.model');
const Quote = require('./quote.model');

const Notification = mongoose.model('Notification', new mongoose.Schema({
    type: String,
    quoteId: {
        type: mongoose.Schema.Types.Mixed,
        ref: Quote
    },
    authorId: {
        type: mongoose.Schema.Types.Mixed,
        ref: User
    },
    receiverId: {
        type: mongoose.Schema.Types.Mixed,
        ref: User
    },
    body: {
        type: String
    },
    seen: {
        type: Boolean
    }
}, {
    timestamps: true
}))

module.exports = Notification