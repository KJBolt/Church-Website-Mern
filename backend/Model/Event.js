import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    userId: {
      type: String,
    },
    title: {
        type: String,
        unique:true,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, {timestamps:true});

export default mongoose.model('Event', eventSchema);