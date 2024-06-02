import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, InputBase, useTheme } from "@mui/material";
import { Send, ExitToApp, Fullscreen, FullscreenExit, Minimize, MessageOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Message from "components/Message";
import UserImage from "components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setChatFriendInfo, setChatId } from "../../state";
import socket from "../../socket";

/* NEED TO REFACTOR THIS COMPONENT */
const ChatWidget = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isChatWidgetVisible, setIsChatWidgetVisible] = useState(false);
    const { palette } = useTheme();
    const loggedInUserId = useSelector(state => state.user._id);
    const { chatFriendId, chatFriendName, chatFriendPicturePath } = useSelector(state => state);
    const chatId = useSelector(state => state.chatId);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (chatId) {
            console.log('TESTING SOCKET CONNECTION');
            fetchMessages();
            socket.connect();

            socket.on('connect', () => {
                console.log('Socket connected:', socket.id);
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            socket.emit('joinChat', chatId);

            socket.on('receiveMessage', (newMessage) => {
                console.log('Received message:', newMessage);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off('receiveMessage');
                socket.emit('leaveChat', chatId);
            };
        }
    }, [chatId]);

    const fetchMessages = async () => {
        const response = await fetch(`http://localhost:3001/messages/${chatId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const messages = await response.json();
        const formattedMessages = messages.map(msg => ({
            ...msg,
            isOwn: msg.senderId === loggedInUserId,
        }));
        setMessages(formattedMessages);
        console.log("Fetched messages:", messages);
    };

    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = async () => {
        if (message.trim() !== "") {
            const newMessage = {
                chatId,
                senderId: loggedInUserId,
                text: message,
            };

            socket.emit('sendMessage', newMessage);

            // Save message to the database
            const response = await fetch(`http://localhost:3001/messages/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    chatId,
                    senderId: loggedInUserId,
                    text: message,
                }),
            });

            if (response.ok) {
                setMessages([...messages, { ...newMessage, isOwn: true }]);
                setMessage("");
            } else {
                console.error('Failed to send message');
            }
        }
    };

    const handleExitChat = () => {
        setMessages([]);
        dispatch(setChatFriendInfo({ chatFriendId: null, chatFriendName: null, chatFriendPicturePath: null }));
        dispatch(setChatId({ chatId: null }));
        setIsChatWidgetVisible(false);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleChatButtonClick = () => {
        setIsChatWidgetVisible(!isChatWidgetVisible);
    };

    return (
        <>
            {!isChatWidgetVisible && (
                <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 2000 }}>
                    <IconButton
                        onClick={handleChatButtonClick}
                        sx={{
                            backgroundColor: palette.primary.main,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: palette.primary.dark,
                            },
                            borderRadius: '50%',
                            padding: '12px',
                        }}
                    >
                        <MessageOutlined />
                    </IconButton>
                </Box>
            )}
            {isChatWidgetVisible && (
                <WidgetWrapper sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    width: isFullscreen ? '70vw' : '350px',
                    height: isFullscreen ? '70vh' : '500px',
                    zIndex: 1000,
                    transition: 'all 0.3s ease-in-out',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    {!chatFriendId ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <Typography variant="h6">Select a friend to chat</Typography>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" height="100%">
                            {/* Chat header */}
                            <FlexBetween mb="1rem" sx={{ padding: '4px 8px' }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <UserImage image={chatFriendPicturePath} size="32px" />
                                    <Typography variant="subtitle2">{chatFriendName}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconButton color="primary" onClick={toggleFullscreen} sx={{ padding: '4px' }}>
                                        {isFullscreen ? <FullscreenExit fontSize="small" /> : <Fullscreen fontSize="small" />}
                                    </IconButton>
                                    <IconButton color="primary" onClick={handleChatButtonClick} sx={{ padding: '4px' }}>
                                        <Minimize fontSize="small" />
                                    </IconButton>
                                    <IconButton color="primary" onClick={handleExitChat} sx={{ padding: '4px' }}>
                                        <ExitToApp fontSize="small" />
                                    </IconButton>
                                </Box>
                            </FlexBetween>
                            {/* Chat messages area */}
                            <Box
                                flexGrow={1}
                                p={2}
                                bgcolor={palette.background.alt}
                                borderRadius="5px"
                                overflow="auto"
                                display="flex"
                                flexDirection="column"
                            >
                                {messages.map((msg, index) => (
                                    <Message key={index} message={msg.text} isOwnMessage={msg.isOwn} />
                                ))}
                            </Box>
                            {/* Input area */}
                            <FlexBetween mt={2}>
                                <InputBase
                                    sx={{ flex: 1, ml: 1, p: 1, backgroundColor: palette.neutral.light, borderRadius: "5px" }}
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={handleChange}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <IconButton color="primary" onClick={handleSubmit} sx={{ ml: 1 }}>
                                    <Send />
                                </IconButton>
                            </FlexBetween>
                        </Box>
                    )}
                </WidgetWrapper>
            )}
        </>
    );
};

export default ChatWidget;