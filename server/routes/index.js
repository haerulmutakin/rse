const express = require('express');
const userController = require('../controllers/user.controller');
const quoteController = require('../controllers/quote.controller');

const appRoutes = express.Router();

appRoutes.route('/user')
    .get(userController.findUser)

appRoutes.route('/quote')
    .get(quoteController.findQuotes)

module.exports = appRoutes;