const ResponseSchema = require('../_utils/response-body.util');
const Notification = require('../models/notification.model');
const Like = require('../models/like.model');
const OnlineUser = require('../models/online-user.model');
const Quote = require('../models/quote.model');

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
        payload.receiverId = userId.id;
        payload.seen = false;

        const notifData = new Notification(payload);
        await notifData.save();
        const newNotif = await Notification.findOne({_id: notifData.id}).populate('authorId', 'username').sort({'createdAt': 'desc'})
        emitNotification(socket, 'new', newNotif);
    } else {
        console.log('quote data not found')
    }
}

exports.updateNotificationSeen = async (socket, data) => {
    const {userId, notifIds} = data;
    const updateData = await Notification.updateMany({_id: {$in: notifIds}}, {seen: true})
    const {modifiedCount} = updateData;
    if(modifiedCount > 0) {
        emitUpdatedNotification(socket, userId);
    }
}

exports.removeNotification = async (socket, data) => {
    const likeData = await Like.findById(data._id);
    if(likeData) {
        const notifData = await Notification.findOneAndDelete({type: data.type, quoteId: likeData.quoteId, authorId: likeData.authorId})
        if(notifData) {
            emitNotification(socket, 'remove', notifData);
            return true;
        } else {
            return false;
        }
    }
    return false;
}

getReceiver = async (data) => {
    const quote = await Quote.findOne({_id: data.quoteId}).populate('userId', '_id')
    return quote;
}

emitNotification = async (socket, type, notifData) => {
    const socketData = await getReceiverSocketId(notifData);
    if(socketData) {
        const payload = {
            type: type,
            data: notifData
        }
        socket.to(socketData.socketId).emit('get:notification', payload);
    } else {
        console.log('not emmiting, socketData not found')
    }
}

emitUpdatedNotification = async (socket, receiverId) => {
    const notif = await Notification.find({receiverId: receiverId}).populate('authorId', 'username').sort({'createdAt': 'desc'});
    socket.emit('get:updatednotification', notif)
}

getReceiverSocketId = async (notifData) => {
    const online = await OnlineUser.findOne({userId: notifData.receiverId});
    return online
}