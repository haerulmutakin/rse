const ResponseSchema = require('../_utils/response-body.util');
const User = require('../models/user.model');

exports.findUser = async (req, res) => {
    const qParams = req.query;
    const {username} = qParams;
    
    const users = await User.find({username: username});
    
    res.send(ResponseSchema.list(users));
}