import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import Login from './Login';
import { getUser, getAllUsers } from '../utils/API';

const AppHome = () => {
  const searchAllUser = async (event) => {
    event.preventDefault();

    try {
      const response = await getAllUsers();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const users = await response.json();
      console.log('this res', response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!Auth.loggedIn()) {
    return <Login />;
  } else
    return (
      <Form>
        <Form.Group>
          <Form.Label>Search user:</Form.Label>
          <Form.Control type='search' placeholder='Search users' />
        </Form.Group>
        <button variant='primary' type='submit' onSubmit={searchAllUser}>
          Search
        </button>

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
