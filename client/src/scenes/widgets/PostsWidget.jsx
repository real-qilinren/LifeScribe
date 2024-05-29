import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const token = useSelector(state => state.token);

    const fetchAllPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const posts = await response.json();
        dispatch(setPosts({posts: posts}));
    }

    const fetchUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const posts = await response.json();
        dispatch(setPosts({posts: posts}));
    }

    useEffect(() => {
        if (isProfile) {
            fetchUserPosts();
        } else {
            fetchAllPosts();
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
          {posts.map(
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
                  />
              )
          )}
      </>
    );
}

export default PostsWidget;