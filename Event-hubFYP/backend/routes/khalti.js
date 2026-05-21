import express from 'express';
import axios from 'axios';
import Booking from '../models/Booking.js';
import Event from '../models/Events.js';

const router = express.Router();

// Route for initiating Khalti payment
router.post('epayment/initiate', async (req, res) => {
  try {
    // Extract booking ID from the request body
    const { bookingId } = req.body;

    // Find the booking object by ID
    const booking = await Booking.findById(bookingId);

    // Check if the booking exists
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Find the event object associated with the booking
    const event = await Event.findById(booking.eventId);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Prepare data for Khalti payment request
    const paymentData = {
      amount: booking.amount, // Use the booking amount
      product_identity: booking.bookingId, // Use the booking ID as product identity
      mobile: booking.phone, // Use the phone number from booking
      email: booking.email, // Use the email from booking
      product_url: `http://localhost:3000/events/${event._id}`, // Use the event URL
    };

    // Make a request to Khalti's API to initiate the payment
    const khaltiResponse = await axios.post('https:/khalti.com/api/v2/epayment/initiate', paymentData, {
      headers: {
        'Authorization': `aa0be78bee1845d586f9fb1dafedb0cd`, 
        'Content-Type': 'application/json',
      },
    });

    // Assuming khaltiResponse contains the necessary payment details
    const redirectUrl = khaltiResponse.data.redirectUrl;

    // Send the redirect URL back to the frontend
    res.json({ success: true, redirectUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
