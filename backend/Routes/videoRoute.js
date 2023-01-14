import express from 'express';
import {
    addVideo,
    updateVideo,
    findVideo,
    deleteVideo,
    getTrends,
    getRandom,
    search,
    likeVideo,
    getVideos,
    getVideoStats
} from '../controllers/videoController.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Create Video
router.post('/' ,verifyToken, addVideo );

// update Video
router.put('/:id' ,verifyToken, updateVideo );

// find Video
router.get('/find/:id' , findVideo );

// Delete Video
router.delete('/:id' ,verifyToken, deleteVideo );

// Trend videos
router.get('/trend', getTrends);

// Get videos
router.get('/all', getVideos);

// Get Video Stats
router.get('/get/stats', verifyToken, getVideoStats);

// Random videos
router.get('/random', getRandom);

// Search Videos
router.get('/search', search);

// Like Video
router.put('/like/:id', verifyToken, likeVideo);

export default router;