const ResponseSchema = require('../_utils/response-body.util');
const Quote = require('../models/quote.model');

exports.findQuotes = async (req, res) => {
    const quotes = await Quote.find().populate('userId', 'username');
    const result = [];
    quotes.forEach(item => {
        const {_id, username } = item.userId;
        result.push({
            "_id": item._id,
            "userId": _id,
            "username": username,
            "theme": item.theme,
            "body": item.body
        })
    });
    res.send(ResponseSchema.list(result))
}