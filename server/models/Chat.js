import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user1Name: {
        type: String,
        required: true
    },
    user2Name: {
        type: String,
        required: true
    },
    user1PicturePath: {
        type: String,
        required: true
    },
    user2PicturePath: {
        type: String,
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    lastMessage: {
        type: String,
    }
}, {
    timestamps: true,
    indexes: [
        { user1Id: 1, user2Id: 1, unique: true }
    ]
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;