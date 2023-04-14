import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import Signup from './Signup';
import Login from './Login';

const AppHome = () => {
  if (!Auth.loggedIn()) {
    return (
      <Form>
        <Login />
        <Signup />
      </Form>
    );
  } else
    return (
      <Form>
        <header>
          <h1>Home</h1>
          <p>Search user:</p>
          <input type='search' placeholder='Search users'></input>
          <button type='submit'>Submit</button>

          <p>Search skill:</p>
          <input type='search' placeholder='Search skills'></input>
          <button type='submit'>Submit</button>
        </header>
      </Form>
    );
};

export default AppHome;
