import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import eventRoute from './routes/events.js';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/auth.js';
import bookingRoute from './routes/booking.js';
import reviewRoute from './routes/review.js';
import khaltiRoutes from './routes/khalti.js';
import dashboardRoutes  from './routes/dashboardRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin :true,
    credentials :true 
}

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);     
        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB database connection failed:', err);
        process.exit(1); // Exit process with failure
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


// Routes
app.use('/api/v1/events', eventRoute);
app.use('/api/v1/users', userRoute); 
app.use('/api/v1/auth', authRoute); 
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/vendors', vendorRoutes);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v2/epayment', khaltiRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Error handling middleware for handling validation errors
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: err.message });
    }
    next(err);
});

// Error handling middleware for handling authentication errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    next(err);
});

// Error handling middleware for handling database errors
app.use((err, req, res, next) => {
    if (err.name === 'MongoError') {
        return res.status(500).json({ success: false, message: 'Database error' });
    }
    next(err);
});

// Generic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
});


app.use((req,res,next) =>{
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Start server
app.listen(port, () => {
    connectDB();
    console.log('Server listening on port', port);
});
