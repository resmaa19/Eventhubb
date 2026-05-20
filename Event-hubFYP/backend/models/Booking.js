// Import necessary modules
import mongoose from 'mongoose';

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true 
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bookAt: {
        type: Date,
        required: true
    },
    guestSize: {
        type: Number,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

// Create a model using the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Export the model
export default Booking;
