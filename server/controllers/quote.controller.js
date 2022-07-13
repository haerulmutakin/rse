const ResponseSchema = require('../_utils/response-body.util');
const Quote = require('../models/quote.model');

exports.findQuotes = async (req, res) => {
    const quotes = await Quote.find();
    res.send(ResponseSchema.list(quotes))
}