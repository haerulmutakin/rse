const express = require('express');
const userController = require('../controllers/user.controller');
const quoteController = require('../controllers/quote.controller');
const commentController = require('../controllers/comment.controller');
const likeController = require('../controllers/like.controller');
const notifController = require('../controllers/notification.controller');
const roomController = require('../controllers/room.controller');
const messageController = require('../controllers/message.controller');

const appRoutes = express.Router();

appRoutes.route('/user')
    .get(userController.findUser)

appRoutes.route('/quote')
    .get(quoteController.findQuotes)
    .post(quoteController.addQuote)

appRoutes.route('/comment')
    .get(commentController.findComments)

appRoutes.route('/like')
    .get(likeController.findLike)

appRoutes.route('/notification')
    .get(notifController.getNotificationByReceiver)

appRoutes.route('/room')
    .get(roomController.findRoom)
    .post(roomController.addRoom)

appRoutes.route('/message')
    .get(messageController.getMessageByRoom)

appRoutes.route('/last-message')
    .get(messageController.getLastMessage)

module.exports = appRoutes;