const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String
});;
module.exports = mongoose.model('User', schema);