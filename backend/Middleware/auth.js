const user = require('../Model/userModel');
const jwt = require('jsonwebtoken')


// Middleware to protect routes
const protectRuote = async (req, res, next) => {
    try {
        
        const token = req.headers.token;

        const decode_token = jwt.verify(token, process.env.JWT_SECRET);

        const User = await user.findById(decode_token.userId).select("-password");

        if (!User) {
            return res.json({success: false, message: "User Not found."});
        }

        req.User = User;
        next();

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


module.exports = {
    protectRuote
}