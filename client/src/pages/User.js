import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import SkillCreate from '../components/CreateSkill';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';

const AppUser = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId: userId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_user` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Navigate />` component to redirect to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/user" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (
      <h4>
        You need to be logged in to see your user page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <Form>
      <header className='App-header'>
        <h1>User Info</h1>
        <p>{`${user.username}'s`}</p>
        <p>{`${user.email}'s`}</p>
        <p>{userId ? `${user.skills}'s` : 'No'} skills</p>
        <SkillCreate/>
      </header>
    </Form>
  );
};

export default AppUser;
