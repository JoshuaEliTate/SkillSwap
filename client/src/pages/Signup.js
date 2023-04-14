import React, { useState } from 'react';
import { createUser } from '../utils/API';

const AppSignup = () => {
  //control wrapper active
  const [isActive, setIsActive] = useState(false);

  const onClickSwitch = () => {
    setIsActive(!isActive);
  };
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        console.log(userFormData);
        // createUser(userFormData);
        alert('Email or Password are in Use');
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      // Auth.getToken(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div onSubmit={handleFormSubmit}>
      <div className='form-box register'>
        <h2>Registration</h2>
        <div className='input-box'>
          <span className='icon'>
            <ion-icon name='person'></ion-icon>
          </span>
          <input
            type='username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
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
          Register
        </button>
        <div className='login-register'>
          <p>
            Already have an account?{' '}
            <a href='#' className='login-link' onClick={onClickSwitch}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppSignup;
