const ResponseSchema = require('../_utils/response-body.util');
const Comment = require('../models/comment.model');

exports.findComments = async (req, res) => {
    const qParams = req.query;
    const {quote_id} = qParams;

    const query = {};
    if(quote_id) {
        query['quoteId'] = quote_id
    }

    const result = await Comment.find(query)
    .populate('quoteId', '_id')
    .populate('authorId', 'username');

    res.send(ResponseSchema.list(result))
}

exports.addComment = async (req, res) => {
    const body = req.body;

    const comment = new Comment(body)
    await comment.save();
    res.send(ResponseSchema.success('Successfully add comment'));
}

exports.findCommentById = async (req, res) => {
    const {id} = req.params;
    const result = await Comment.findById(id)
        .populate('quoteId', '_id')
        .populate('authorId', 'username');
    res.send(ResponseSchema.list(result))
}