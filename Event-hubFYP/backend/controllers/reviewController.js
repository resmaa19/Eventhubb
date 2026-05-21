// Route handler for submitting reviews
import Review from '../models/Review.js';
import Event from '../models/Events.js';
export const submitReview = async (req, res) => {
  // Extract parameters from request body
  const { review,username, eventId } = req.body;
  try {
    // Ensure that the user is authenticated
    /* if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please log in to submit a review." });
    }
    
 */

   
    // Create a new review object with the required fields
    console.log("hhhh")
    console.log(eventId);
    const event = await Event.findOne({id: eventId})
    console.log(event)
    const newReview = new Review({
      eventId: event._id,
      reviewText:review,
      username: username // Assign the username from the authenticated user
    });

    // Save the review to the database
    const savedReview = await newReview.save();
    
    // Update the event with the new review
    /* await Event.findByIdAndUpdate(req.params.eventId, {
      $push: { reviews: savedReview._id }
    }); */

    // Respond with success message and the saved review data
    res.status(200).json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};

export const getReviewsById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findOne({id: eventId})
      const eventReviews = await Review.find({ eventId: event._id });
      
      res.status(200).json({ success: true, data: eventReviews });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "An error occurred while fetching events" });
  }
};