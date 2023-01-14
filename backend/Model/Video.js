import mongoose from 'mongoose';

const Schema = mongoose.Schema

const videoSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: [String],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
},{timestamps: true})

export default mongoose.models.Video || mongoose.model('Video', videoSchema)