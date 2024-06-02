import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
}, {
    timestamps: true,
    indexes: [
        { user1Id: 1, user2Id: 1, unique: true }
    ]
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;