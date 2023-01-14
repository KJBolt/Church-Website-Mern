import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique:true
    },
    email: {
        type: String,
        unique:true
    },
    img: {
        type: String
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
}, {timestamps:true});

export default mongoose.models.User || mongoose.model('User', userSchema);