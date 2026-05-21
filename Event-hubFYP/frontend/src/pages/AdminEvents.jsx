import React, { useState } from 'react'
import Sidebar from './Sidebar';
import AllEvents from './AllEvents';

const AdminEvents = () => {
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
        <AllEvents /> {/* Updated component import */}
      </div>
    );
}

export default AdminEvents