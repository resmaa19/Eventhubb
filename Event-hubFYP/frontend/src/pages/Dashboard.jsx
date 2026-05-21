
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import DashboardHeader from './dashboardHeader';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome'; // Updated import
import '../styles/dashboard.css';

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/dashboard`);
        // Handle response data as needed
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='grid-container'>
      <DashboardHeader OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <DashboardHome /> {/* Updated component import */}
    </div>
  );
};

export default Dashboard;
