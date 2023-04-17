import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME, QUERY_SKILLS } from '../utils/queries';
import Login from './Login';
import SkillsList from '../components/SkillSearchAll';
const AppHome = () => {
  const { loading, data } = useQuery(QUERY_SKILLS);
  const skills = data?.skills || [];
  console.log(skills)

  if (!Auth.loggedIn()) {
    return <Login />;
  } else
    return (
      <section>
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
      {/* <SkillsList
              skills={skills}
              title="Here's the current roster of Skills..."
            /> */}
      </section>
      
    );
};

export default AppHome;
