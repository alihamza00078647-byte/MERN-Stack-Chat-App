const user = require('../Model/userModel');



// Middleware to protect routes
export const protectRuote = async () => {
    try {
        
        const token = req.headers.token;
        const User = await URLSearchParams.findById()

    } catch (error) {
        
    }
}