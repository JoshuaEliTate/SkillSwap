import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import Signup from './Signup';
import Login from './Login';

const AppHome = () => {
  if (!Auth.loggedIn()) {
    return <Login />;
  } else
    return (
      <Form>
        <Form.Group>
          <Form.Label>Search user:</Form.Label>
          <Form.Control type='search' placeholder='Search users' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Search
        </Button>

        <Form.Group>
          <Form.Label>Search skill:</Form.Label>
          <Form.Control type='search' placeholder='Search skills' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Search
        </Button>
      </Form>
    );
};

export default AppHome;
