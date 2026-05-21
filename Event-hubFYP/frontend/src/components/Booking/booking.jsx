import React, { useState, useContext } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "./booking.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, khaltiBaseURL } from "../../utils/config";

const Booking = ({ event, user }) => {
  const { appointmentcharge } = event;
  console.log(event);
  console.log(user);
  const [bookingDetails, setBookingDetails] = useState({
    eventId: event._id,
    username: user.username,
    fullName: "",
    phone: "",
    email: "",
    bookAt: "",
    guestSize: "",
    budget: "",
    location: "",
  });

  const handleBooking = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make a POST request to your backend to create a booking

      const data = {
        eventId: event._id,
        username: user.username,
        fullName: bookingDetails.fullName,
        phone: bookingDetails.phone,
        email:bookingDetails.email,
        bookAt: bookingDetails.bookAt,
        guestSize: bookingDetails.guestSize,
        budget: bookingDetails.budget,
        location: bookingDetails.location,
      };
      console.log("Check")
      const bookingResponse = await axios.post(
        `${BASE_URL}/booking`,
        data
      );

      console.log("Check2")

      window.location.href = bookingResponse.data.data.payment_url;
      // Check if the booking was successfully created
      /* if (bookingResponse.data && bookingResponse.data.success) {
        // Make a POST request to your backend to initiate Khalti payment
        const khaltiResponse = await axios.post(`${khaltiBaseURL}/epayment/initiate`, bookingDetails);
       
        // Check if the payment was successfully initiated
        if (khaltiResponse.data && khaltiResponse.data.success) {
          // Redirect the user to the Khalti checkout page
          window.location.href = khaltiResponse.data.redirectUrl;
        } else {
          console.error('Failed to initiate payment');
          alert('Failed to initiate payment. Please try again later.');
        }
      } else {
        console.error('Failed to create booking');
        alert('Failed to create booking. Please try again later.');
      } */
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          {appointmentcharge}
          <span>/appointment price</span>
        </h3>
      </div>

      <h5>Information</h5>
      <Form className="booking_info-form" onSubmit={handleBooking}>
        <FormGroup>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={bookingDetails.fullName}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={bookingDetails.phone}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={bookingDetails.email}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup className="d-flex align-items-center gap-3">
          <Input
            type="date"
            name="bookAt"
            placeholder="Booking Date"
            value={bookingDetails.bookAt}
            onChange={handleInputChange}
            required
          />
          <Input
            type="number"
            name="guestSize"
            placeholder="Guests"
            value={bookingDetails.guestSize}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="select"
            name="budget"
            value={bookingDetails.budget}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Budget</option>
            <option value="10lakh-15lakh">10 Lakh - 15 Lakh</option>
            <option value="20lakh-40lakh">20 Lakh - 40 Lakh</option>
            <option value="50lakh-90lakh">50 Lakh - 90 Lakh</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input
            type="select"
            name="location"
            value={bookingDetails.location}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Location</option>
            <option value="Pokhara">Pokhara</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Chitwan">Chitwan</option>
          </Input>
        </FormGroup>
        <Button type="submit" color="primary">
          Submit Booking
        </Button>
      </Form>
    </div>
  );
};

export default Booking;
