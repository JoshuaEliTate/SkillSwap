import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import SkillCreate from '../components/CreateSkill';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';

const AppUser =  () => {


  const { userId } = useParams();
  // console.log(userId)
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId: userId },
    }
  );
    console.log(Auth.getUser())
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_user` query
  const user = Auth.getUser().data || {};
    // console.log(user)
  // Use React Router's `<Navigate />` component to redirect to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/user" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see your user page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  //  const grabSkills = async (allData)=> {
//   let Data = await allData.me.skills
//     for (let i = 0; i < allData.me.skills.length; i++) {
//       let skillName =  await allData.me.skills[i].skillName
//       let description = await allData.me.skills[i].description
//       let price = await allData.me.skills[i].price
//       let skillHTML = await `${skillName}, ${description}, ${price} `
//     }
//   }
  // console.log(grabSkills(data))
  return (
    <>
      <header className='App-header'>
        <h1>User Info</h1>
        <p>{`${user.username}'s`}</p>
        <p>{`${user.email}'s`}</p>
        <p>{data.me.skills[0] ? `${data.me.skills[1].skillName}, ${data.me.skills[1].description}, ${data.me.skills[1].price}` : 'No Skills'}</p>
        <SkillCreate/>
      </header>
      </>
  );
};

export default AppUser;
