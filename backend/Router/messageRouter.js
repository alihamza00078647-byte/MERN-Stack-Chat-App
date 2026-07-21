const express = require('express');
const { getUserforSidebar, getMessages, markMessagesAsSeen, sendMessage } = require('../Controller/messageController');
const { protectRuote } = require('../Middleware/auth');
const messageRouter = express.Router();



messageRouter.get('/users', protectRuote, getUserforSidebar);

messageRouter.get('/:id', protectRuote, getMessages);

messageRouter.put('/mark/:id', protectRuote, markMessagesAsSeen);

messageRouter.post('/send/:id', protectRuote, sendMessage);


exports.messageRouter = messageRouter;