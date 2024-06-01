import { Server } from 'socket.io';
import { handleMessageCreation } from '../controllers/handleMessageCreation.js';

export const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        socket.on('sendMessage', async ({ chatId, senderId, text }) => {
            try {
                const message = await handleMessageCreation({ chatId, senderId, text });
                io.to(chatId).emit('receiveMessage', message);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
};