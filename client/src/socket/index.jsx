// src/socket/socket.js
import { io } from 'socket.io-client';

const URL = 'http://localhost:3000'; // 替换为你的后端地址
const socket = io(URL, {
    autoConnect: false,
});

export default socket;