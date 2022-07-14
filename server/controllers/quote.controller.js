const ResponseSchema = require('../_utils/response-body.util');
const Quote = require('../models/quote.model');

exports.findQuotes = async (req, res) => {
    const quotes = await Quote.find()
                            .sort({'createdAt': 'desc'})
                            .populate('userId', 'username');
    const result = [];
    quotes.forEach(item => {
        const {_id, username } = item.userId;
        result.push({
            "_id": item._id,
            "userId": _id,
            "username": username,
            "theme": item.theme,
            "body": item.body,
            "createdAt": item.createdAt
        })
    });
    res.send(ResponseSchema.list(result))
}


exports.addQuote = async (req, res) => {
    const body = req.body;

    const quoteData = new Quote(body)
    await quoteData.save();
    res.send(ResponseSchema.success('Successfully add quote'));
}