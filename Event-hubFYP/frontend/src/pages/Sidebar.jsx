import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import "../styles/dashboard.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header'/> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/dashboard">
            <BsGrid1X2Fill className='icon'/> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/events">
            <BsFillArchiveFill className='icon'/> Events
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/bookings">
            <BsFillGrid3X3GapFill className='icon'/> Bookings
          </Link>
        </li>
        {/* <li className='sidebar-list-item'>
          <Link to="/users">
            <BsPeopleFill className='icon'/> Users
          </Link>
        </li> */}
        <li className='sidebar-list-item'>
        <Link to="/vendors">
            <BsListCheck className='icon'/> Vendor
            </Link>

        </li>
        {/* <li className='sidebar-list-item'>
          <Link to="/reports">
            <BsMenuButtonWideFill className='icon'/> Reports
          </Link>
        </li> */}
        {/* <li className='sidebar-list-item'>
          <Link to="/settings">
            <BsFillGearFill className='icon'/> Setting
          </Link>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
