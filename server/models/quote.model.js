const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: String,
    username: String,
    theme: String,
    body: String
})

module.exports = mongoose.model('Quote', schema)