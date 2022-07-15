const mongoose = require('mongoose');
const User = require('./user.model');
const Quote = require('./quote.model');

const Comment = mongoose.model('Comment', new mongoose.Schema({
    quoteId: {
        type: mongoose.Schema.Types.Mixed,
        ref: Quote
    },
    authorId: {
        type: mongoose.Schema.Types.Mixed,
        ref: User
    },
    body: String,
}, {
    timestamps: true
}));

module.exports = Comment;