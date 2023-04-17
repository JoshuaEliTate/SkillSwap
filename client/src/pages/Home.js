import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import Login from './Login';
import { getUser, getAllUsers } from '../utils/API';

const AppHome = () => {
  const [singleUser, setSingleUser] = useState({});
  const [allUsers, setAllUsers] = useState({});

  const searchInputChange = (event) => {
    const { name, value } = event.target;
    setSingleUser({ ...singleUser, [name]: value });
  };

  const searchAllUser = async (event) => {
    event.preventDefault();

    try {
      const response = await getAllUsers([]);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const allUsers = await response.json();
      setAllUsers(allUsers);

      // console.log(allUsers[7].username);
      console.log(singleUser.username);

      if (singleUser.username) {
        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].username === singleUser.username) {
            setAllUsers([allUsers[i]]);
            return;
          } else {
            setAllUsers([]);
          }
        }
        // If we reach this point, no matching user was found
        return 'User not found';
      }

      console.log('User not found.');
    } catch (error) {
      console.error(error);
    }
  };

  if (!Auth.loggedIn()) {
    return <Login />;
  } else
    return (
      <div>
        <div>
          <Form onSubmit={searchAllUser}>
            <Form.Group>
              <Form.Label>Search user:</Form.Label>
              <input
                type='search'
                name='username'
                onChange={searchInputChange}
                value={singleUser.username || ''}
              ></input>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Search
            </Button>
          </Form>

          <Form.Group>
            <Form.Label>Search skill:</Form.Label>
            <Form.Control type='search' placeholder='Search skills' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </div>
        <div className='card'>
          {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <div className='container' key={user._id}>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Skill Count: {user.skills.length}</p>
              </div>
            ))
          ) : (
            <p>User not found</p>
          )}
        </div>
      </div>
    );
};

export default AppHome;
