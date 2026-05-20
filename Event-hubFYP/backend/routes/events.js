import express from 'express';
import { createEvent, getEventById, updateEventById, deleteEventById, getAllEvents } from './../controllers/eventController.js';
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Route for creating a new event
router.post('/', createEvent);

// Route for getting a single event by object ID
router.get('/:id', getEventById); // Use id instead of _id

// Route for updating an event by object ID
router.put('/:id',updateEventById); // Use id instead of _id

// Route for deleting an event by object ID
router.delete('/:id', deleteEventById); // Use id instead of _id

// Route for getting all events
router.get('/', getAllEvents);

export default router;
