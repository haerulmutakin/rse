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