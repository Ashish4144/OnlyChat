import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(          //Idhar error tha yaad se
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        text: {
            type: String,
        },

        image: {
            type: String,
        },
    },
        { timestamp : true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;