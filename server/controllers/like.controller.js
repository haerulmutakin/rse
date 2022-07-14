const ResponseSchema = require('../_utils/response-body.util');
const Like = require('../models/like.model');

exports.findLike = async (req, res) => {
    const qParams = req.query;
    const {quote_id} = qParams;

    const query = {};
    if(quote_id) {
        query['quoteId'] = quote_id
    }

    const like = await Like.find(query).populate('authorId', 'username');
    res.send(ResponseSchema.list(like))
}

exports.addLike = async (socket, data) => {
    const likeData = new Like(data);
    likeData.save();
}

exports.removeLike = async (socket, data) => {
    const remove = await Like.deleteOne({_id: data._id})
}