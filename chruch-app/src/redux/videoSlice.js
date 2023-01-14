import {createSlice} from '@reduxjs/toolkit';

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        currentVideo: {},
        comments: [],
        videos: []
    },
    reducers: {
        getVideo: (state, action) => {
            state.currentVideo = action.payload
        },
        likeVideo: (state, action) => {
            if (state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes = state.currentVideo.likes.filter((videoId) => videoId !== action.payload);
                state.currentVideo.likeCount = state.currentVideo.likeCount - 1
            } else {
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.likeCount = state.currentVideo.likeCount + 1
            }
        },
        getComments: (state, action) => {
            state.comments = action.payload
        },
        getVideos: (state, action) => {
            state.videos = action.payload
        }
    }
});

export const {getVideo, likeVideo, getComments, getVideos} = videoSlice.actions;
export default videoSlice.reducer;