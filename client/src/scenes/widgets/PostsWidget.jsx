import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import {Box, CircularProgress} from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const token = useSelector(state => state.token);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const posts = await response.json();
            dispatch(setPosts({ posts: posts }));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const posts = await response.json();
            dispatch(setPosts({ posts: posts }));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isProfile) {
            fetchUserPosts();
        } else {
            fetchAllPosts();
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>;
    }

    return (
        <>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map(
                    ({
                         _id,
                         userId,
                         firstName,
                         lastName,
                         description,
                         location,
                         picturePath,
                         userPicturePath,
                         likes,
                         comments
                     }) => (
                        <PostWidget
                            key={_id}
                            postId={_id}
                            userId={userId}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                            isProfile={isProfile}
                        />
                    )
                )
            ) : (
                <div>No posts available.</div>
            )}
        </>
    );
}

export default PostsWidget;