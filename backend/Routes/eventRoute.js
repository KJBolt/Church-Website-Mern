import express from 'express';
import {
    createEvent,
    deleteEvent,
    getEvents,
    getEvent,
    updateEvent,
    getRecentEvents
} from "../Controllers/eventController.js";
import {verifyToken} from "../verifyToken.js";

const router = express.Router();

// Create Event
router.post('/', verifyToken, createEvent);

// Delete Event
router.delete('/:id', verifyToken, deleteEvent);

// Get Events
router.get('/', getEvents);

// Get Recent Events
router.get('/recent', getRecentEvents);

// Get Event
router.get('/find/:id', getEvent);

// Update Event
router.put('/:id', verifyToken, updateEvent);


export default router