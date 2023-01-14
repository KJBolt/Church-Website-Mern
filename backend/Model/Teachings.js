import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teachingsSchema = new Schema({
    userId: {
        type: String
    },
    author: {
        type: String
    },
    title: {
        type: String,
        unique:true
    },
    body: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default:0
    }, 
    like: {
        type: [String],
        default: null
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, {timestamps:true});

export default mongoose.model('Teaching', teachingsSchema);