const express = require('express');
const userController = require('../controllers/user.controller');
const roomController = require('../controllers/room.controller');

const appRoutes = express.Router();

appRoutes.route('/user')
    .get(userController.findUser)

appRoutes.route('/room')
    .get(roomController.findUserRooms)

appRoutes.route('/room/:id')
    .get(roomController.findRoom)

module.exports = appRoutes;