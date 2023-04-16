import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import SkillCreate from '../components/CreateSkill';

const AppUser = () => {
  const { userId } = useParams();

  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  // If user is not logged in, prompt them to log in
  if (!Auth.loggedIn()) {
    return (
      <a href='/'>
        You need to be logged in to see your user page. Use is link to sign up
        or log in!
      </a>
    );
  }
  // Get user data from Auth
  const { data: userData } = Auth.getUser();
  // Redirect to homepage if user is viewing their own profile
  if (Auth.loggedIn() && userData._id === userId) {
    return <Navigate to='/' />;
  }

  // Render loading message while query is running
  if (loading) {
    return <div>Loading...</div>;
  }

  // Otherwise, render the user's profile
  const user = userId ? data?.user : userData || {};

  return (
    <div>
      <SkillCreate />
      <div className='profile'>
        <h2>My profile</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>I have: {data?.me?.skills.length || 0} skill(s)</p>
      </div>

      <div className='card'>
        {data?.me?.skills.length > 0 ? (
          data.me.skills.map((skill, index) => (
            <div className='container' key={index}>
              <h4>
                <b>{skill.skillName}</b>
              </h4>
              <p> {skill.description} </p>
              <p>${skill.price}</p>
            </div>
          ))
        ) : (
          <p>No Skills, please add one</p>
        )}
      </div>
    </div>
  );
};

export default AppUser;
