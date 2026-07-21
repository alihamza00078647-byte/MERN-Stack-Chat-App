const { cloudinary } = require('../Lib/cloudinary');
const { generateToken } = require('../Lib/utils');
const user = require('../Model/userModel');
const bcrypt = require('bcryptjs');





// Sign up Controller for New User
const signup = async (req, res) => {
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


const Login = async (req, res) => {
    try {

        const {email, password} = req.body;
        const userData = await user.findOne({email});

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            res.json({success: false, message: "Credentials Errors"});
        }

        const token = generateToken(userData._id);

        res.json({success:true, userData, token, message: "Login Successfully"});
        
    } catch (error) {
        res.json({success:false, message: error.message});
    }    
}


// Whether the user is authicated or not?
const checkAuth = (req, res) => {

    try {
        res.json({success: true, User: req.User});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}



// Controller to update user profile
const updateProfile = async (req, res) => {
    try {
        const {profilePic, bio, fullName} = req.body;
        
        const userId = req.User._id;
        // console.log(profilePic, bio, fullName);
        let updatedUser;

        if (!profilePic) {
            updatedUser = await user.findByIdAndUpdate(userId, {bio, fullName}, {new: true});

        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await user.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new: true}).select("-password");
        } 

        res.json({success:true, User: updatedUser});

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}



module.exports = {
    signup, Login, checkAuth, updateProfile
}