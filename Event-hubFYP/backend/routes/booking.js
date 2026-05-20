import express from 'express';
import { createBooking, getAllBookings, getBookingById, updateBookingById, deleteBookingById } from '../controllers/bookingController.js';
import { addVendor, getAllVendors } from '../controllers/vendorController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// Route to create a new booking
router.post('/', createBooking);

// Route to get all bookings
router.get('/', getAllBookings);

// Route to get a single booking by ID
router.get('/:id', getBookingById);

// Route to update a booking by ID
router.put('/:id', updateBookingById);

// Route to delete a booking by ID
router.delete('/:id', deleteBookingById);


// for vendors


export default router;
