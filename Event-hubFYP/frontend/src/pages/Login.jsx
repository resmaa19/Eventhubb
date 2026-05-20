import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

import loginImg from '../assets/images/login.jpg';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log(result); // Log the response data to the console

      if (!res.ok) {
        throw new Error(result.message);
      }

      // Check if the response contains the user data in the expected format
      if (result.success && result.data && result.data.username && result.data.role) {
        console.log(result.data)
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        navigate(result.data.role === 'admin' ? '/dashboard' : '/');
      } else {
        // Handle the case where the response format is unexpected
        throw new Error('Invalid response format');
      }
    } catch (err) {
      alert(err.message); // Display error message if login fails
    }
  };

  return (
    <section className="login-section">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container">
              <Row>
                <Col lg="6" className="login_img_col">
                  <div className="login_img">
                    <img src={loginImg} alt="Login" />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="login_form">
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          required
                          value={credentials.username}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          required
                          value={credentials.password}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          value={credentials.email}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <Button className="btn secondary_btn auth_btn" type="submit">
                        Login
                      </Button>
                    </Form>
                    <p>
                      {' '}
                      Don't have an account? <Link to="/register">Create</Link>
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
