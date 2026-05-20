import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import AllVendors from './AllVendors';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const Vendors = () => {
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
      <AllVendors/> {/* Updated component import */}
    </div>
  );
}

export default Vendors