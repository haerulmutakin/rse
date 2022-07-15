const ResponseSchema = require('../_utils/response-body.util');
const Notification = require('../models/notification.model');
const Quote = require('../models/quote.model');

exports.getNotification = async (req, res) => {
    const notif = await Notification.find().populate('receiverId', 'username').populate('authorId', 'username');
    res.send(notif)
}

exports.getNotificationByReceiver = async (req, res) => {
    const params = req.query;
    const {receiver_id} = params;
    const query = {};
    if(receiver_id) {
        query['receiverId'] = receiver_id
    }
    const notif = await Notification.find(query).populate('authorId', 'username').sort({'createdAt': 'desc'});
    res.send(ResponseSchema.list(notif))
}

exports.addNotification = async (socket, data) => {
    const quoteData = await getReceiver(data)
    if(quoteData) {
        const payload = {...data};
        const {userId} = quoteData;
        payload.receiverId = userId.id

        const notifData = new Notification(payload);
        await notifData.save();
    } else {
        console.log('quote data not found')
    }
}

getReceiver = async (data) => {
    const quote = await Quote.findOne({_id: data.quoteId}).populate('userId', '_id')
    return quote;
}