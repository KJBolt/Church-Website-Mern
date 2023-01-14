import express from 'express';
import { addAudio, deleteAudio, getAudio, getAudios, getRandomAudios, updateAudio } from '../controllers/audioController.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Add Audio
router.post('/add', verifyToken, addAudio)

// Update Audio
router.put('/:id', verifyToken, updateAudio)

// Delete Audio
router.delete('/:id', verifyToken, deleteAudio)

// Find Audio
router.get('/find/:id', getAudio)

// Get all Audio
router.get('/', getAudios)

// Get random Audio
router.get('/random', getRandomAudios)


export default router