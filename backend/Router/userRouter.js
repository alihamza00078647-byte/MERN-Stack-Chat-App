const express = require('express');
const { signup, Login, updateProfile, checkAuth } = require('../Controller/userController');
const { protectRuote } = require('../Middleware/auth');
const userRouter = express.Router();




userRouter.post('/signup', signup);

userRouter.post('/login', Login);

userRouter.put('/update-profile', protectRuote, updateProfile);

userRouter.put('/check', protectRuote, checkAuth);


exports.userRouter = userRouter;