import React, { useState, useEffect, useContext } from 'react';
import SuccessMessage from '../DisplayMessage/SuccessMessage';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Profile.css'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const UpdateProfile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Simulated user data for demonstration
  // const user = useSelector(state => state.user); 
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
      console.log(user)
    }
  }, [user]);

  // Form submit handler
  const formSubmitHandler =async e => {
    e.preventDefault();
    // Here, you would typically make an API request to update the user profile
    // For this example, let's assume the update is successful without making an actual request
    // You can set a success state to display a success message
    // setSuccess(true);
    const res = await fetch(`${BASE_URL}/auth/updateProfile`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: name, 
        email: email,
        _id: user._id
      }),
    });

    if(res.ok){
      const data = await res.json();
      console.log(data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.updatedUser });
      alert('Profile successfully');
    }else{
      // alert('Review submitted successfully');
      alert('Failed to update profile');
    }
  };

  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto mt-5'>
        <div className='container'>
          {success && (
            <SuccessMessage msg='Updated successfully. Logout and login with your new credentials' />
          )}
          <h1 className='text-center'>Update Profile</h1>
          <form onSubmit={formSubmitHandler}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Enter Name'
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Enter email'
                  required
                />
              </div>
              {/* <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Password'
                />
              </div> */}
              <button type='submit' className='btn btn-primary m-auto mt-3'>
                Update Profile
              </button>
            </fieldset>
          </form>
          {/* <Link to='/user-update'>Update your profile</Link> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
