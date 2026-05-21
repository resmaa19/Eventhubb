// auth.js

import express from 'express';
import { verifyToken, verifyAdmin } from '../utils/verifyToken.js';
import {registerUser, loginUser, updateUserProfile} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/updateProfile', updateUserProfile);

// Admin route requiring authentication and admin role
router.post('/admin/route', verifyToken, verifyAdmin, (req, res) => {
    // Only executed if the user is authenticated and has admin role
    res.status(200).json({ success: true, message: 'Admin route accessed successfully' });
});

export default router;
