import React, { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import "./header.css";

import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  
  const Navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    Navigate('/');
  };

  const handleUpdateProfile = () => {
    // Redirect the user to the update profile page
    Navigate('/user-update');
  };

  return (
    <header className="header">
      <div className="navbar" style={{ backgroundColor: 'sage' }}>
        <div className="nav-links">
          <div className="main-links mt-2">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/events">Events</NavLink>
          </div>
          <NavLink to="/eventhub" className="eventhub-link" style={{ fontSize: '40px', fontWeight: 'lighter' }}>
            <i>EventHub</i>
          </NavLink>
        </div>
        <div className="auth-buttons">
          {user ? (
            <div className="user-info">
              <h5 className='mb-0'>{user.username}</h5>
              <Button className="btn btn-dark" onClick={logout}>Logout</Button>
              <Button className="btn btn-primary" onClick={handleUpdateProfile}>Profile</Button>
            </div>
          ) : (
            <>
              <Button color="primary"><NavLink to="/login">Login</NavLink></Button>
              <Button color="secondary"><NavLink to="/register">Signup</NavLink></Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
