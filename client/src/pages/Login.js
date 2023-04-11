import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { loginUser } from '../utils/API';

const AppLogin = (props) => {
  const [userFormData, setUserFormData] = useState({
    username: '',
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
      const response = await loginUser(userFormData);

      if (!response.ok) {
        console.log(userFormData);
        // createUser(userFormData);
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      // Auth.create(token);
    } catch (err) {
      console.log(err);
      console.error(err);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <header className='App-header'>
        <h1>Login</h1>
        <p>Username:</p>
        <input
          type='username'
          placeholder='your username'
          name='username'
          onChange={handleInputChange}
          value={userFormData.username}
        ></input>

        <p>password:</p>
        <input
          type='password'
          placeholder='your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
        ></input>
        <button type='submit'>Login</button>
      </header>
    </Form>
  );
};

export default AppLogin;
