import express from 'express';
import {
    createTeaching,
    deleteTeaching,
    getTeaching,
    getTeachings,
    getRandom,
    getTrending,
    likeTeaching,
    updateTeaching,
    searchTeaching,
    sendMessage,
    getDashboardTeachings,
    getPostStats
} from '../Controllers/TeachingsController.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

//Create Teaching
router.post('/create', verifyToken, createTeaching  );

// Delete Teaching
router.delete('/:id', verifyToken, deleteTeaching  );

// Update Teaching
router.put('/:id', verifyToken, updateTeaching );

// Get Teaching
router.get('/find/:id', getTeaching );

// Get all Teaching
router.get('/all', getTeachings );

// Get dashboard Teachings
router.get('/dashboardTeachings', getDashboardTeachings );

// Get Teaching Stats
router.get('/get/stats', verifyToken, getPostStats)

// Like Teaching
router.put('/like/:id', verifyToken, likeTeaching );

// Trending Teachings
router.get('/trend', getTrending );

// Random Teachings
router.get('/random', getRandom );

// Search Teachings
router.get('/search', searchTeaching );

// Send Message
router.post('/message', sendMessage );



export default router