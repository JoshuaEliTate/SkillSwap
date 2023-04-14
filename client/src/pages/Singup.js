import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { createUser } from '../utils/API';

const AppSingup = () => {
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
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.getToken(token);
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
    <Form onSubmit={handleFormSubmit}>
      <header className='App-header'>
        <h1>SingUp</h1>
        <p>Username:</p>
        <input
          type='username'
          placeholder='your username'
          name='username'
          onChange={handleInputChange}
          value={userFormData.username}
        ></input>
        <p>Email:</p>
        <input
          type='email'
          placeholder='your email'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
        ></input>
        <p>password:</p>
        <input
          type='password'
          placeholder='your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
        ></input>
        <button type='submit'>Sing Up</button>
        <p>
          Already have an account? <a href='/login'>Log in</a>
        </p>
      </header>
    </Form>
  );
};

export default AppSingup;
