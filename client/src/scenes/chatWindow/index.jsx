import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import ChatListWidget from "../widgets/ChatListWidget";
import ChatWidget from "../widgets/ChatWidget";

const ChatWindow = () => {
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [chatName, setChatName] = useState(null);
    const isNonMobile = useMediaQuery("(min-width:1000px)");

    const handleChatSelect = (chatId, chatName) => {
        setChatName(chatName);
        setSelectedChatId(chatId);
    };

    const handleChatClose = () => {
        setSelectedChatId(null);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                display: 'flex',
                flexDirection: isNonMobile ? 'row' : 'column',
                alignItems: 'flex-end',
                zIndex: 1000,
            }}
        >
            <ChatListWidget onChatSelect={handleChatSelect} />
            {selectedChatId && (
                <ChatWidget chatId={selectedChatId} onClose={handleChatClose} chatName={chatName} />
            )}
        </Box>
    );
};

export default ChatWindow;