import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage";

const ChatItem = ({ chatId, name, picturePath, lastMessage, onSelect, setChatName }) => {
    const { palette } = useTheme();

    return (
        <ListItem
            button
            onClick={() => onSelect(chatId, name)}
            sx={{
                backgroundColor: palette.background.paper,
                borderRadius: "0.5rem",
                marginBottom: "0.5rem",
                padding: "0.5rem",
                "&:hover": {
                    backgroundColor: palette.action.hover,
                },
            }}
        >
            <ListItemAvatar>
                <UserImage image={picturePath} size="40px" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="subtitle1" noWrap>
                        {name}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="textSecondary" noWrap>
                        {lastMessage}
                    </Typography>
                }
                sx={{
                    marginLeft: "0.5rem",
                }}
            />
        </ListItem>
    );
};

export default ChatItem;