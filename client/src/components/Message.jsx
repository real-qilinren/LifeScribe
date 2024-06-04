import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Message = ({ message, isOwnMessage }) => {
    const { palette } = useTheme();
    const alignSelf = isOwnMessage ? "flex-end" : "flex-start";
    const backgroundColor = isOwnMessage ? palette.primary.main : palette.neutral.light;
    const color = isOwnMessage ? palette.background.alt : palette.neutral.dark;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: alignSelf,
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: '12px',
                padding: '8px 12px',
                maxWidth: '70%',
                margin: '4px 0'
            }}
        >
            <Typography variant="body2" sx={{ marginLeft: isOwnMessage ? 'auto' : '8px' }}>{message}</Typography>
        </Box>
    );
}

export default Message;