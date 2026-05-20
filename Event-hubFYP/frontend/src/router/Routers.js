import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

import Home from './../pages/Home.jsx';
import Events from './../pages/Events';
import EventDetails from './../pages/EventDetails';
import About from './../pages/About.jsx';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from "../pages/Thankyou";
import Dashboard from '../pages/Dashboard.jsx';
import Bookings from '../pages/Bookings.jsx';
import UpdateProfile from '../Profile/UpdateProfile.js'
import Vendors from '../pages/Vendors.jsx';
import AdminEvents from '../pages/AdminEvents.jsx';




const Routers = () => {
  // Use useContext to access the AuthContext
  const { user } = useContext(AuthContext);

  console.log("User role:", user?.role);


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/events' element={<Events />} />
      <Route path='/events/:id' element={<EventDetails />} />
      <Route path='/login' element={<Login />} /> 
      <Route path='/register' element={<Register />} />
      <Route path='/event/search' element={<SearchResultList />} />
      <Route path='/thank-you' element={<ThankYou />} />
      <Route path='/user-update' element={<UpdateProfile/>} />
      <Route path='/bookings' element={<Bookings/>} />
      <Route path='/vendors' element={<Vendors/>} />
      <Route path='/admin/events' element={<AdminEvents/>} />
     {/* Conditionally render dashboard or home page based on user's role */}
     {user && user.role === 'admin' ? (
        <Route path='/dashboard' element={<Dashboard />} />
      ) : (
        <Route path='/' element={<Home />} />
      )}

      {/* Redirect to login page if user is not authenticated */}
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default Routers;
