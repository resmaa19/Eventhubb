import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonSection from '../share/CommonSection';
import "../styles/event.css";
import useFetch from '../hooks/useFetch'; // Import the useFetch hook
import { BASE_URL } from "../utils/config";


// import event1Image from "../assets/images/event1.jpg";
// import event3Image from "../assets/images/event3.jpg";
// import event4Image from "../assets/images/event5.jpg";
// import event5Image from "../assets/images/event6.jpg";

const Events = () => {
  // State to store events data
  const { data: events, error, loading } = useFetch(`${BASE_URL}/events`); // Call useFetch hook with the appropriate URL
  
  // Define packages
  const packages = [
    { id: 1, type: "Basic", features: ["Venue Booking", "Event Planning Consultation", "Decorations"] },
    { id: 2, type: "Standard", features: ["Venue Booking", "Event Planning", "Decorations", "Catering Services"] },
    { id: 3, type: "Premium", features: ["Venue Booking", "Event Planning", "Decorations", "Catering Services", "Entertainment (DJ/Music)"] },
  ];

  return (
    <>
      <CommonSection />
      <div className="events-container">
        <div className="events-sidebar">
          <h2 className="events-title">All Events</h2>
        </div>
        <div className="events-gallery">
          {loading && <p>Loading events...</p>}
          {error && <p>Error fetching events data: {error}</p>}
          {events.map(event => (
            <Link key={event.id} to={`/Events/${event.id}`}>
              <div className="event-card">
              
                <img src={event.image} alt={event.title} />
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <div className="ratings">Ratings: {event.ratings}</div>
                  <div className="appointment-charge">Appointment Charge: {event.appointmentCharge}</div>
                  <button>Book Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="packages-section">
          <h2 className="packages-title">Packages</h2>
          <div className="packages-container">
            {packages.map(pkg => (
              <div key={pkg.id} className="package-card">
                <h3 className="package-type">{pkg.type}</h3>
                <ul>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
