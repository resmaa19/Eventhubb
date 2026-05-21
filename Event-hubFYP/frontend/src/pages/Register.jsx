import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'; // Changed import to useHistory
import '../styles/register.css';
import registerImg from '../assets/images/register.jpg';

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const {  dispatch } = useContext(AuthContext);
  const Navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'contact') setContact(value);
    else if (name === 'address') setAddress(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleClick(e);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, contact, address })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      Navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="register-section">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register-container d-flex justify-content-between">
              <div className="register-img">
                <img src={registerImg} alt="" />
              </div>
              <div className="register-form">
                <Form onSubmit={handleSubmit}>
                  {/* Input fields */}
                  <FormGroup>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      required
                      value={username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      name="contact"
                      placeholder="Contact"
                      required
                      value={contact}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      required
                      value={address}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary_btn auth_btn" type="submit">SignUp</Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
