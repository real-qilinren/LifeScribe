import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: "2rem",
    backgroundColor: theme.palette.background.default,
    borderRadius: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${theme.palette.divider}`,
}));

export default WidgetWrapper;