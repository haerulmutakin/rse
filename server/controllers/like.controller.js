const ResponseSchema = require('../_utils/response-body.util');
const Like = require('../models/like.model');
const notifCont = require('./notification.controller');

exports.findLike = async (req, res) => {
    const qParams = req.query;
    const {quote_id, author_id} = qParams;

    const query = {};
    if(quote_id) {
        query['quoteId'] = quote_id
    }
    if(author_id) {
        query['authorId'] = author_id
    }

    const like = await Like.find(query).populate('authorId', 'username');
    res.send(ResponseSchema.list(like))
}

exports.addLike = async (socket, data) => {
    const likeData = new Like(data);
    await likeData.save();
    data.type = 'like';
    await notifCont.addNotification(socket, data)
    emitLikes(socket, data);
}

exports.removeLike = async (socket, data) => {
    data.type = 'like';
    const notifDeleted = await notifCont.removeNotification(socket, data)
    if(notifDeleted) {
       const deleteData =  await Like.findOneAndDelete({_id: data._id})
       emitLikes(socket, deleteData)
    }
}

emitLikes = async (socket, data) => {
    const likes = await Like.find({authorId: data.authorId});
    socket.emit('user_likes', likes)
}