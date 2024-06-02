import {ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, DeleteOutlined} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useState} from "react";
import {setPost, setPosts} from "../../state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    isProfile=false
}) => {
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: loggedInUserId})
        });

        const updatedPost = await response.json();
        dispatch(setPost({post: updatedPost}));
    }

    const deletePost = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/delete`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const posts = await response.json();
        dispatch(setPosts({posts: posts}));
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
                isProfile={isProfile}
            />

            <Typography color={main} sx={{mt: "1rem"}}>
                {description}
            </Typography>

            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ marginTop: "0.75rem", borderRadius: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike} sx={{ color: isLiked ? primary : main }}>
                            {isLiked ? <FavoriteOutlined sx={{ color: primary}} /> : <FavoriteBorderOutlined />}
                        </IconButton>

                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsCommentsVisible(!isCommentsVisible)}>
                            <ChatBubbleOutlineOutlined/>
                        </IconButton>

                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                    {postUserId === loggedInUserId && (
                        <IconButton onClick={deletePost}>
                            <DeleteOutlined />
                        </IconButton>
                    )}
                </FlexBetween>

            </FlexBetween>

            {isCommentsVisible && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
            </WidgetWrapper>
    )
}

export default PostWidget;