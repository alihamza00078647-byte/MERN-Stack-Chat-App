const express = require('express');
const { getUserforSidebar, getMessages, markMessagesAsSeen } = require('../Controller/messageController');
const { protectRuote } = require('../Middleware/auth');
const messageRouter = express.Router();



messageRouter.get('/users', protectRuote, getUserforSidebar);

messageRouter.get('/:id', protectRuote, getMessages);

messageRouter.put('/mark/:id', protectRuote, markMessagesAsSeen);


exports.messageRouter = messageRouter;