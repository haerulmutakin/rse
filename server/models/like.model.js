const mongoose = require('mongoose');
const User = require('./user.model');
const Quote = require('./quote.model');

const Like = mongoose.model('Like', new mongoose.Schema({
    quoteId: {
        type: mongoose.Schema.Types.Mixed,
        ref: Quote
    },
    authorId: {
        type: mongoose.Schema.Types.Mixed,
        ref: User
    },
}))


module.exports = Like;