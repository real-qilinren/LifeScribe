import Chat from '../models/Chat.js';

/* READ */
export const getChats = async (req, res) => {
    try {
        const userId = req.user.id;
        const chats = await Chat.find({
            $or: [
                { user1Id: userId },
                { user2Id: userId }
            ]
        }).sort({ updatedAt: -1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* CREATE */
export const createChat = async (req, res) => {
    try {
        const {
            user1Id,
            user2Id,
            user1Name,
            user2Name,
            user1PicturePath,
            user2PicturePath,
        } = req.body;

        // Check if the chat already exists
        let chat = await Chat.findOne({
            $or: [
                { user1Id, user2Id },
                { user1Id: user2Id, user2Id: user1Id }
            ]
        });

        // If the chat doesn't exist, create a new one
        if (!chat) {
            chat = new Chat({
                user1Id,
                user2Id,
                user1Name,
                user2Name,
                user1PicturePath,
                user2PicturePath,
            });
            await chat.save();
        }

        res.status(201).json(chat);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/* DELETE */
export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        await Chat.findByIdAndDelete(chatId);
        const chats = await Chat.find().sort({ updatedAt: -1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}