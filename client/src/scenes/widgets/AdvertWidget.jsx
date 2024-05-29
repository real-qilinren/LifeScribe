import {
    Typography,
    useTheme
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h3" fontWeight="500">
                    Advert
                </Typography>

                <Typography color={medium} variant="body2">
                    Create Ad
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/info4.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>
                    MeccaCosmetics
                </Typography>
                <Typography color={medium}>
                    mecca.com
                </Typography>
            </FlexBetween>
            <Typography
                color={medium}
                m="0.5rem 0"
            >
                Make sure your skin is ready for the summer with our new collection.
            </Typography>
        </WidgetWrapper>
    );
}

export default AdvertWidget;