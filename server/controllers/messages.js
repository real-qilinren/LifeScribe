import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

/* READ */
export const getChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId).populate({
            path: 'messages',
            options: { sort: { 'createdAt': 1 } }
        });
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


/* CREATE */
export const sendMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;

        await handleMessageCreation({ chatId, senderId, text });

        res.status(201).json("Message sent successfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Helper function to create a new message and add it to the chat
export const handleMessageCreation = async ({ chatId, senderId, text }) => {
    const message = new Message({
        sender: senderId,
        text,
        chatId
    });
    await message.save();

    // add the message to the chat to update the db
    const chat = await Chat.findById(chatId);
    chat.messages.push(message._id);
    await chat.save();

    return message;
}