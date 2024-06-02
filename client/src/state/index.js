import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    chatFriendId: null,
    chatFriendName: "",
    chatFriendPicturePath: "",
    chatId: null,
    messages: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends not exist");
            }
        },
        setChatFriendInfo: (state, action) => {
            state.chatFriendId = action.payload.chatFriendId;
            state.chatFriendName = action.payload.chatFriendName;
            state.chatFriendPicturePath = action.payload.chatFriendPicturePath;
        },
        setChatId: (state, action) => {
            state.chatId = action.payload.chatId;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setMessages: (state, action) => {
            state.messages = action.payload.messages;
        },
        setPost: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
        },
    }
});

export const { setMode, setLogin, setLogout, setFriends, setChatFriendInfo, setChatId, setPosts, setMessages, setPost } = authSlice.actions;

export default authSlice.reducer;
