import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { loginUser } from '../utils/API';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const AppLogin = () => {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  });
  const [validated] = useState(false);
  const [loginUser, { error, data }] = useMutation(LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;

    try {
      const { data } = await loginUser({ variables: { ...userFormData } });
      if (!data) {
        console.log(userFormData);
        throw new Error('something went wrong!');
      }
      Auth.login(data.login.token);
      console.log(Auth.data);
    } catch (error) {
      console.log(data);
      alert('Incorrect Email or Password');
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <div className='wrapper'>
        <span className='icon-colse'>
          <ion-icon name='close'></ion-icon>
        </span>
        <div className='form-box login'>
          <h2>Login</h2>
          <div className='input-box'>
            <span className='icon'>
              <ion-icon name='mail'></ion-icon>
            </span>
            <input
              type='email'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            ></input>
            <label>Email</label>
          </div>

          <div className='input-box'>
            <span className='icon'>
              <ion-icon name='lock-closed'></ion-icon>
            </span>
            <input
              type='password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            ></input>
            <label>Password</label>
          </div>

          <button type='submit' className='btn'>
            Login
          </button>
          <div className='login-register'>
            <p>
              Don't have an account?{' '}
              <a href='#' className='register-link'>
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AppLogin;
