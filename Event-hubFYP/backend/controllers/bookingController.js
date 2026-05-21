import Booking from '../models/Booking.js';

import qs from 'querystring'; 
import mongoose from 'mongoose';
import User from '../models/User.js';
import request from 'request'; 
import Event from '../models/Events.js';
// Controller function to create a new booking with Khalti payment
export const createBooking = async (req, res) => {
    try {
        const { eventId, username, fullName, email, phone, bookAt, guestSize, budget, location } = req.body;

        // Find the user ID based on the username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userId = user._id;

        const event = await Event.findById(eventId);

        // Create a new booking instance
        const newBooking = new Booking({
            eventId,
            userId,
            fullName,
            email,
            phone,
            bookAt: new Date(bookAt),
            guestSize,
            budget,
            location
        });

        // Save the booking to the database
        const savedBooking = await newBooking.save();

        // Prepare data for Khalti payment request
        
        const options = {
            method: 'POST',
            url: 'https://a.khalti.com/api/v2/epayment/initiate/',
            headers: {
                'Authorization': 'key f18821e033ef44b99b308bbcc2413502',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "return_url": "http://localhost:3000/thankyou",
                "website_url": "http://localhost:3000/",
                "amount": event.appointmentCharge,
                "purchase_order_id": "hello", // Use the booking ID as the purchase order ID
                "purchase_order_name": "Booking Payment",
            })
        };


        request(options, function (error, response) {
            
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            const data = JSON.parse(response.body);
            console.log(data)
            if (data) {
            
                // Redirect the user to the Khalti checkout page
                return res.json({data:data})
            } else {
                
                // Handle payment initiation failure
                return res.status(400).json({ message: 'Failed to initiate payment' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};




// Function to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();

        // const bookingsDtos= [];


        // bookings.map(each=>{

        //     bookingsDtos.push({
        //         _id: each._id,
        //         fullName: each.fullName,
        //         email: each.email,
        //         bookAt:each.bookAt,
        //         guestSize:each.guestSize,
        //         budget: each.budget,
        //         location:each.location
        //     })
        // })
        console.log(bookings)
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get a single booking by ID
export const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const booking = await Booking.findOne({ bookingId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update a booking by ID
export const updateBookingById = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to delete a booking by ID
export const deleteBookingById = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
