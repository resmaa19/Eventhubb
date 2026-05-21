import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useParams } from "react-router-dom";
import Booking from "../components/Booking/booking.jsx";
import "../styles/event-details.css";
import useFetch from "../hooks/useFetch.js"; // Import the useFetch hook
import { BASE_URL } from "../utils/config.js";
import { AuthContext } from "../context/AuthContext.js";

// Import event images
import event1Image from "../assets/images/event1.jpg";
import event3Image from "../assets/images/event3.jpg";
import event4Image from "../assets/images/event5.jpg";
import event5Image from "../assets/images/event6.jpg";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // State to store event details
  const { data: event } = useFetch(`${BASE_URL}/events/${id}`);

  useEffect(() => {
    // Fetch reviews when the component mounts
    fetchReviews();
  }, [id]); // Fetch reviews whenever the event ID changes

  const fetchReviews = async () => {
    try {
      console.log(id);
      const response = await fetch(`${BASE_URL}/reviews/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const reviewsData = await response.json();

      setReviews(reviewsData.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to fetch reviews");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        alert("Please login first");
        return;
      }
      console.log(user.username);
      const reviewObj = {
        eventId: id,
        review: review,
        username: user.username,
      };

      console.log(reviewObj);
      const res = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewObj),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      alert("Review submitted successfully");
      setReview("");
      setSubmitted(true);
      fetchReviews(); // Fetch reviews again to update the list
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review");
    }
  };

  if (!event) {
    return <p>No event found.</p>;
  }

  // Determine which image to display based on event ID


  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="event_content">
              <img src={event.image} alt={event.title} />
              <div className="event_info">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p className="appointment-charge">
                  Appointment Charge: {event.appointmentCharge}
                </p>
              </div>
            </div>
            {!submitted && (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="review">Enter your review:</Label>
                  <Input
                    type="textarea"
                    name="review"
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    className="review-textarea"
                  />
                </FormGroup>
                <Button type="submit" color="primary">
                  Submit Review
                </Button>
              </Form>
            )}
          </Col>
          <Col lg="4">
            <Booking event={event} user={user} />
          </Col>
        </Row>
      </Container>

      {/* Display user reviews */}
      <Container className="mt-4">
        <h3>User Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="user-review">
            <p>
              <strong>{review.username}</strong>
            </p>
            <p>{review.reviewText}</p>
            {/* <p>Rating: {review.rating}</p> */}
          </div>
        ))}
      </Container>
    </section>
  );
};

export default EventDetails;
