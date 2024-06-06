import React, { useEffect, useState } from "react";
import { Typography, List } from "@mui/material";
import { useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import ChatItem from "components/ChatItem";

const ChatListWidget = ({ onChatSelect }) => {
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user._id);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetchChats();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchChats = async () => {
        const response = await fetch(`http://localhost:3001/chats`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setChats(data);
    };

    return (
        <WidgetWrapper
            sx={{
                width: '20rem',
                maxHeight: '80vh',
                overflowY: 'auto',
                boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
                borderRadius: '1rem',
            }}
        >
            <Typography variant="h6" sx={{ padding: "1rem" }}>
                Messages
            </Typography>
            <List>
                {chats.map((chat) => {
                    const isUser1 = chat.user1Id === userId;
                    const name = isUser1 ? chat.user2Name : chat.user1Name;
                    const picturePath = isUser1 ? chat.user2PicturePath : chat.user1PicturePath;
                    return (
                        <ChatItem
                            key={chat._id}
                            chatId={chat._id}
                            name={name}
                            picturePath={picturePath}
                            lastMessage={chat.lastMessage}
                            onSelect={onChatSelect}
                        />
                    );
                })}
            </List>
        </WidgetWrapper>
    );
};

export default ChatListWidget;
