import Navbar from "../navbar";
import {Box, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";

const HomePage = () => {
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobile ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobile ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobile ? "42%" : undefined}
                    mt={isNonMobile ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    {/*<PostsWidget userId={_id} />*/}
                </Box>
                {isNonMobile && (
                    <Box flexBasis="26%">
                        {/*<AdvertWidget />*/}
                        {/*<Box m="2rem 0" />*/}
                        {/*<FriendListWidget userId={_id} />*/}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default HomePage;