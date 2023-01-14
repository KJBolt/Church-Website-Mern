import mongoose from 'mongoose';

const Schema = mongoose.Schema

const audioSchema = new Schema({
    userId: {
        type: String
    },
    author: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Audio', audioSchema);