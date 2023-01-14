import {createSlice} from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        currentPost: {},
        getPosts: [],
        recentPosts: []
    },
    reducers: {
        getPost: (state, action) => {
            state.currentPost = action.payload
        },
        refreshPost: (state) => {
            state.currentPost = null
        },
        like: (state, action) => {
            if (state.currentPost.like.includes(action.payload)) {
                state.currentPost.like = state.currentPost.like.filter((postId) => postId !== action.payload);
                state.currentPost.likeCount = state.currentPost.likeCount - 1
            } else {
                state.currentPost.like.push(action.payload);
                state.currentPost.likeCount = state.currentPost.likeCount + 1
            }
        },
        getAllPosts: (state, action) => {
            state.getPosts = action.payload
        },
        getRecentPosts: (state, action) => {
            state.recentPosts = action.payload
        }
    }
});

export const {getPost, refreshPost, like, getAllPosts, getRecentPosts} = postSlice.actions;
export default postSlice.reducer;