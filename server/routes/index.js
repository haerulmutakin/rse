const express = require('express');
const userController = require('../controllers/user.controller');
const quoteController = require('../controllers/quote.controller');
const commentController = require('../controllers/comment.controller');
const likeController = require('../controllers/like.controller');
const notifController = require('../controllers/notification.controller');

const appRoutes = express.Router();

appRoutes.route('/user')
    .get(userController.findUser)

appRoutes.route('/quote')
    .get(quoteController.findQuotes)
    .post(quoteController.addQuote)

appRoutes.route('/comment')
    .get(commentController.findComments)
    .post(commentController.addComment)
appRoutes.route('/comment/:id')
    .get(commentController.findCommentById)

appRoutes.route('/like')
    .get(likeController.findLike)

appRoutes.route('/notification')
    .get(notifController.getNotification)


module.exports = appRoutes;