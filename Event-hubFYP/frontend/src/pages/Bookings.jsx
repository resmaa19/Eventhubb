import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import DashboardHeader from './dashboardHeader';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome'; // Updated import
import '../styles/dashboard.css';
import AllBookings from './AllBookings';

const Bookings = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <AllBookings /> {/* Updated component import */}
    </div>
  );
};

export default Bookings;
