import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
  eventId: { // Changed field name to eventId
    type: mongoose.Types.ObjectId,
    ref: "Event", // Changed model name to singular
  },
  reviewText: {
    type: String,
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
