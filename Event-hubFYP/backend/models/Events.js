import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    appointmentCharge: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    reviews: [{
        reviewText: {
            type: String,
            // required: true
        },
        rating: {
            type: Number,
            // required: true
        },
        username: {
            type: String,
            // required: true
        }
    }]
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
