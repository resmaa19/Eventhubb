import express from 'express';
import { submitReview,getReviewsById } from '../controllers/reviewController.js';


const router = express.Router();

// Define routes for submitting reviews and getting reviews by eventId
router.post('/:eventId', submitReview); // Add verifyUser middleware before submitReview
router.get('/:id', getReviewsById);

export default router;
