const { generateToken } = require('../Lib/utils');
const user = require('../Model/userModel');
const bcrypt = require('bcryptjs');




// Sign up Controller for New User
const signup = async () => {
    const {fullName, email, password, bio} = req.body;

    try {

        if (!fullName || !email || !password || !bio) {
            return res.json({success: false, message: "Missing details"});
        }

        const User = await user.findOne({email});

        if (User) {
            return res.json({success: false, message: "Account already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({fullName, email, password:hashedPassword, bio});
        // newUser.save()

        const token = generateToken(newUser._id);
        res.json({success: true, userData: newUser , token, message: "Account Created Successfully"})
    } catch (err) {
        res.json({success: false, message: "Error! while creating Account"});
    }
}


const Login = async () => {
    try {

        const {email, password} = req.body;
        const userData = await user.findOne({email});

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            res.json({success: false, message: "Credentials Errors"});
        }

        const token = generateToken();

        res.json({success:true, userData, token, message: "Login Successfully"});
        
    } catch (error) {
        res.json({success:false, message: error.message});
    }    
}


// Whether the user is authicated or not?



module.exports = {
    signup, Login
}