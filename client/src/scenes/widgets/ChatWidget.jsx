import React, { useState } from "react";
import { Box, Typography, IconButton, InputBase, useTheme } from "@mui/material";
import { Send, ExitToApp, Fullscreen, FullscreenExit, Minimize, MessageOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Message from "components/Message";
import UserImage from "components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import {setChatFriendInfo} from "../../state";

const ChatWidget = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isChatWidgetVisible, setIsChatWidgetVisible] = useState(false);
    const { palette } = useTheme();
    const { chatFriendId, chatFriendName, chatFriendPicturePath } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = () => {
        if (message.trim() !== "") {
            setMessages([...messages, { text: message, isOwn: true }]);
            setMessage("");
        }
    };

    const handleExitChat = () => {
        // Reset the chat state
        setMessages([]);
        dispatch(setChatFriendInfo({ chatFriendId: null, chatFriendName: null, chatFriendPicturePath: null }));
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
                        <Box mt={2} display="flex" flexDirection="column" height="100%">
                            {/* Chat header */}
                            <FlexBetween mb={2} sx={{ padding: '8px' }}>
                                <Box display="flex" alignItems="center">
                                    <UserImage image={chatFriendPicturePath} size="40px" />
                                    <Typography variant="subtitle1" ml={1}>{chatFriendName}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton color="primary" onClick={toggleFullscreen}>
                                        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                                    </IconButton>
                                    <IconButton color="primary" onClick={handleChatButtonClick}>
                                        <Minimize />
                                    </IconButton>
                                    <IconButton color="primary" onClick={handleExitChat}>
                                        <ExitToApp />
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
