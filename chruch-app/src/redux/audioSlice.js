import {createSlice} from '@reduxjs/toolkit';

const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        currentAudio: {},
    },
    reducers: {
        getAudio : (state, action) => {
            state.currentAudio = action.payload
        },
        
    }
});

export const {getAudio} = audioSlice.actions;
export default audioSlice.reducer;