const express = require('express');
const userController = require('../controllers/user.controller');
const roomController = require('../controllers/room.controller');
const messageController = require('../controllers/message.controller');

const appRoutes = express.Router();

appRoutes.route('/user')
    .get(userController.findUser)

appRoutes.route('/friends')
    .get(userController.findUsersButMe)

appRoutes.route('/room')
    .get(roomController.findUserRooms)

appRoutes.route('/room')
    .post(roomController.addRoom)

appRoutes.route('/room/:id')
    .get(roomController.findRoom)

appRoutes.route('/message/:id')
    .get(messageController.findMessageByRoomId)

module.exports = appRoutes;