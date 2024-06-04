import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, InputBase, useTheme } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Message from "components/Message";
import socket from "../../socket/index";

const ChatWidget = () => {
    const testChatId = "665e5b76d286497554ff20bf";
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    const { palette } = useTheme();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchMessages();
        socket.connect();
        socket.emit('joinChat', testChatId);

        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receiveMessage');
            socket.emit('leaveChat', testChatId);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchMessages = async () => {
        const response = await fetch(`http://localhost:3001/messages/${testChatId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setMessages(data.map((msg) => ({ ...msg, isOwn: msg.senderId === _id })));
    };

    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = () => {
        if (message.trim() !== "") {
            const newMessage = { chatId: testChatId, senderId: _id, text: message };
            socket.emit('sendMessage', newMessage);
            setMessage("");
        }
    };

    return (
        <WidgetWrapper sx={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            width: '22rem',
            height: '28rem',
            overflow: 'hidden',
            boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
            borderRadius: '1rem',
        }}>
            <Box display="flex" flexDirection="column" height="100%">
                <FlexBetween sx={{ padding: '0.5rem 1rem' }}>
                    <Typography variant="subtitle2">TESTING CHAT FUNCTION</Typography>
                </FlexBetween>
                <Box
                    flexGrow={1}
                    p="1rem"
                    bgcolor={palette.background.alt}
                    borderRadius="0.5rem"
                    overflow="auto"
                    display="flex"
                    flexDirection="column"
                >
                    {messages.map((msg, index) => (
                        <Message key={index} message={msg.text} isOwnMessage={msg.senderId === _id} />
                    ))}
                </Box>
                <FlexBetween mt="1rem">
                    <InputBase
                        sx={{ flex: 1, ml: '0.5rem', p: '0.5rem 1rem', backgroundColor: palette.neutral.light, borderRadius: "1rem" }}
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleChange}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                    />
                    <IconButton color="primary" onClick={handleSubmit} sx={{ ml: '0.5rem' }}>
                        <Send />
                    </IconButton>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default ChatWidget;
