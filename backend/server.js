import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './Routes/authRoute.js';
import userRoute from './Routes/userRoute.js';
import teachingRoute from './Routes/teachingsRoute.js';
import eventRoute from './Routes/eventRoute.js';
import videoRoute from './Routes/videoRoute.js'
import audioRoute from './Routes/audioRoute.js'
import commentRoute from './Routes/commentRoute.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/teaching', teachingRoute);
app.use('/event', eventRoute);
app.use('/video', videoRoute);
app.use('/audio', audioRoute);
app.use('/comment', commentRoute);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected and listening on port 5000")
    })
})
.catch((error) => {
  throw error
});



