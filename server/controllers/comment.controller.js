const ResponseSchema = require('../_utils/response-body.util');
const Comment = require('../models/comment.model');
const notifCont = require('./notification.controller');

exports.findComments = async (req, res) => {
    const qParams = req.query;
    const {quote_id} = qParams;

    const query = {};
    if(quote_id) {
        query['quoteId'] = quote_id
    }

    const result = await Comment.find(query).sort({'createdAt': 'desc'})
    .populate('quoteId', '_id')
    .populate('authorId', 'username');

    res.send(ResponseSchema.list(result))
}

exports.newComment = async (socket, data) => {
    const comment = new Comment(data)
    await comment.save();
    data.type = 'comment';
    await notifCont.addNotification(socket, data);
}