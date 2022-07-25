const express = require('express');
const userController = require('../controllers/user.controller');

const appRoutes = express.Router();

appRoutes.route('/user')
    .get(userController.findUser)

module.exports = appRoutes;