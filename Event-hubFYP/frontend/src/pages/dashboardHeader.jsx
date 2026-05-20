// DashboardHeader.jsx
import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import '../styles/dashboard.css';

const DashboardHeader = ({ OpenSidebar }) => {
  return (
    <header className='dashboard-header'>
      <div className='menu-icon'>
        <BsJustify className='icon_header' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon_header' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon_header' />
        <BsFillEnvelopeFill className='icon_header' />
        <BsPersonCircle className='icon_header' />
      </div>
    </header>
  );
};

export default DashboardHeader;
