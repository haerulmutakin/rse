const express = require('express');
const userController = require('../controllers/user.controller');
const quoteController = require('../controllers/quote.controller');
const commentController = require('../controllers/comment.controller');

const appRoutes = express.Router();

appRoutes.route('/user')
    .get(userController.findUser)

appRoutes.route('/quote')
    .get(quoteController.findQuotes)
    .post(quoteController.addQuote)

appRoutes.route('/comment')
    .get(commentController.findComments)
appRoutes.route('/comment/:id')
    .get(commentController.findCommentById)

module.exports = appRoutes;