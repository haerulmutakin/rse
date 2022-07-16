const ResponseSchema = require('../_utils/response-body.util');
const Quote = require('../models/quote.model');

exports.findQuotes = async (req, res) => {
    const quotes = await Quote.find().sort({'createdAt': 'desc'}).populate('userId', 'username');

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

exports.newQuote = async (socket, data) => {
    const quoteData = new Quote(data);
    await quoteData.save();
    emitNewQuote(socket, quoteData)
}

emitNewQuote = async (socket, data) => {
    const quotes = await Quote.findOne({_id: data._id}).sort({'createdAt': 'desc'}).populate('userId', 'username');
    if(quotes) {
        const {_id, username } = quotes.userId;
        const payload = {
            "_id": quotes._id,
            "userId": _id,
            "username": username,
            "theme": quotes.theme,
            "body": quotes.body,
            "createdAt": quotes.createdAt
        }
        socket.broadcast.emit('get:quote', payload);
        socket.emit('get:quote', payload);
    }
}