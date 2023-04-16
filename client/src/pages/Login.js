import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { loginUser } from '../utils/API';
import { createUser } from '../utils/API';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const AppLogin = () => {
  //control wrapper active
  const [isActive, setIsActive] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const onClickSwitch = () => {
    setIsActive(!isActive);
  };

  const onClickClose = () => {
    setIsClose(!isClose);
  };

  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginValidated] = useState(false);
  const [loginUser, { error, data }] = useMutation(LOGIN);

  const loginInputChange = (event) => {
    const { name, value } = event.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };
  const loginFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;

    try {
      const { data } = await loginUser({ variables: { ...userLoginData } });
      if (!data) {
        console.log(userLoginData);
        throw new Error('something went wrong!');
      }
      Auth.login(data.login.token);
      // console.log(data.login.token);
      // Reload the current page
      window.location.reload();
    } catch (error) {
      console.log(data);
      alert('Incorrect Email or Password');
    }

    setUserLoginData({
      email: '',
      password: '',
    });
  };

  //for signup part

  const [userSignupData, setUserSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [signupValidated] = useState(false);

  const signupInputChange = (event) => {
    const { name, value } = event.target;
    setUserSignupData({ ...userSignupData, [name]: value });
  };
  const signupFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;

    try {
      const response = await createUser(userSignupData);

      if (!response.ok) {
        console.log(userSignupData);
        // createUser(userSignupData);
        alert('Email or Password are in Use');
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      // Auth.getToken(token);
      // Reload the current page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }

    setUserSignupData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className={`loginForm ${isClose ? 'close' : ''}`}>
      <div className={`wrapper ${isActive ? 'active' : ''}`}>
        <Form noValidate validated={loginValidated} onSubmit={loginFormSubmit}>
          <span className='icon-colse' onClick={onClickClose}>
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
                onChange={loginInputChange}
                value={userLoginData.email}
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
                onChange={loginInputChange}
                value={userLoginData.password}
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
                <a href='#' className='register-link' onClick={onClickSwitch}>
                  Signup
                </a>
              </p>
            </div>
          </div>
        </Form>

        {/* register */}
        <div className='form-box register'>
          <Form
            noValidate
            validated={signupValidated}
            onSubmit={signupFormSubmit}
          >
            <h2>Signup</h2>
            <div className='input-box'>
              <span className='icon'>
                <ion-icon name='person'></ion-icon>
              </span>
              <input
                type='username'
                name='username'
                onChange={signupInputChange}
                value={userSignupData.username}
                required
              ></input>
              <label>Username</label>
            </div>

            <div className='input-box'>
              <span className='icon'>
                <ion-icon name='mail'></ion-icon>
              </span>
              <input
                type='email'
                name='email'
                onChange={signupInputChange}
                value={userSignupData.email}
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
                onChange={signupInputChange}
                value={userSignupData.password}
                required
              ></input>
              <label>Password</label>
            </div>

            <button type='submit' className='btn'>
              Signup
            </button>
            <div className='login-register'>
              <p>
                Already have an account?{' '}
                <a href='#' className='login-link' onClick={onClickSwitch}>
                  Login
                </a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AppLogin;
