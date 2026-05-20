import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';

const router = express.Router();

// Middleware to check user role
const checkUserRole = (req, res, next) => {
    // Assuming you have stored user role information in the request object
    const userRole = req.user.role; // Adjust this based on how user roles are stored in your application
    
    // Check if user is an admin
    if (userRole === 'admin') {
        // If user is an admin, proceed to the next middleware/route handler
        next();
    } else {
        // If user is not an admin, send a forbidden error
        res.status(403).json({ error: 'Access forbidden. Only admins are allowed to access this resource.' });
    }
};

// Route to get dashboard data, protected by role-based access control
router.get('/', checkUserRole, getDashboardData);

export default router;
