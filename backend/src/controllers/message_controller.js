import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../database/cloudinary.js";
import { getReceiverSocketId } from "../database/socket.js";
import { io } from "../database/socket.js";

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({message: "Server Error or Internal Error"});
    }
};

export const getMessages = async (req, res) => { 
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId}, 
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.status(200).json(messages);
    
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({message: "Server Error or Internal Error"});    
    }
};

export const sendMessage = async (req, res) => { 
    try {
        const { text, image } = req.body;
        const { id: receiverId} = req.params; 
        const senderId = req.user._id;

        let imageUrl;               //If any image send later on video request too apne uppar ab
        if(image){      
            const response = await cloudinary.uploader.upload(image);
            imageUrl = response.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

//realtime functionality socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);   
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);  //emit new message to receiver's client side socket.io
        }

    res.status(201).json(newMessage);

    } catch (error) {   
        console.log("Error in sendMessage", error.message);
        res.status(500).json({message: "Server Error or Internal Error"});
    }
};


//Name proper check karte raho