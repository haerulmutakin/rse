const mongoose = require('mongoose');
const User = require('./user.model');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    theme: String,
    body: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Quote', schema)