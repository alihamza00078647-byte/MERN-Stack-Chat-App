const message = require('../Model/messageModel');
const user = require('../Model/userModel');



// External
const { cloudinary } = require('../Lib/cloudinary');
const { userSocketMap, getReceiverSocketId, getIO } = require('../Lib/socket');



const getUserforSidebar = async (req, res) => {
    try {
        
        const userId = req.User._id;
        
        const filteredUser = await user.find({_id: {$ne: userId}}).select('-password');
        
        
        // Count No of unseen msg
        const unseenMessages = {};
        const promise = filteredUser.map(async (user) => {
            const messages = await message.find({senderId: user._id, receiverId: userId, seen: false});
            
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promise);
        res.json({success: true, users: filteredUser, unseenMessages});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// get all messages for selected user
const getMessages = async (req, res) => {
    try {
        
        const {id: selectedUserId} = req.params;
        const myId = req.User._id;

        const messages = await message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        await message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});

        res.json({success: true, messages})

    } catch (error) {
        res.json({success: true, message: error.message});   
    }
}


// Mark Messages as seen using user Id
const markMessagesAsSeen = async (req, res) => {
    try {   
        
        const {id} = req.params;

        await message.findByIdAndUpdate(id, {seen: true});
        res.json({success: true});
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Send Message to Selected User
const sendMessage = async (req, res) => {
    try {
        
        const {text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.User._id;

        let imageURL = "";

        if  (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        const newMessage = await message.create({
            senderId,
            receiverId,
            text,
            image: imageURL
        });


        // Emit the New Message to receiver Socket
       const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            getIO().to(receiverSocketId).emit('newMessage', newMessage);
        }


        res.json({success: true, newMessage})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}





module.exports = {
    getUserforSidebar, markMessagesAsSeen, getMessages, sendMessage
}