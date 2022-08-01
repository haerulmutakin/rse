const ResponseSchema = require('../_utils/response-body.util');
const User = require('../models/user.model');

findUser = async (req, res) => {
    const qParams = req.query;
    const {username} = qParams;
    
    const users = await User.findOne({username: username});
    
    res.send(ResponseSchema.list(users));
}

findUsersButMe = async (req, res) => {
    const params = req.query;

    const friends = await User.find({_id: {$ne: params.user_id}});
    res.send(ResponseSchema.list(friends));
}

module.exports = {
    findUser,
    findUsersButMe
}