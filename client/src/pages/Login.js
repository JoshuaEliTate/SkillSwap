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
  //   const [login, { error }] = useMutation(LOGIN);

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

      if (!data.ok) {
        console.log(userFormData);
        // createUser(userFormData);
        throw new Error('something went wrong!');
      }
      Auth.login(data.login.token);
      //   const { token, user } = await data.json();
      console.log(Auth.data);
      // Auth.create(token);
    } catch (error) {
      //   console.log(err);
      console.log(data);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <header className='App-header'>
        <h1>Login</h1>
        <p>Email:</p>
        <input
          type='email'
          placeholder='your email'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
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
