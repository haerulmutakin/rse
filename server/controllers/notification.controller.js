const Notification = require('../models/notification.model');
const Quote = require('../models/quote.model');

exports.getNotification = async (req, res) => {
    const notif = await Notification.find().populate('receiverId', 'username').populate('authorId', 'username');
    res.send(notif)
}

exports.addNotification = async (socket, data) => {
    const quoteData = await getReceiver(data)
    if(quoteData) {
        const payload = {...data};
        const {userId} = quoteData;
        payload.receiverId = userId._id
        
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