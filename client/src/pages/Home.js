import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME, QUERY_SKILLS } from '../utils/queries';
import Login from './Login';
import SkillsList from '../components/SkillSearchAll';

let searched = false
const AppHome = () => {
  const { loading, data } = useQuery(QUERY_SKILLS);
  const skills = data?.skills || [];
  const [categoryValue, setCategoryValue] = useState("");
  const categoryChange = (event) => {
    let { value } = event.target;
    console.log(value)
    setCategoryValue(value);
  };

  const handleFormSubmit = async (event) => {
    searched = true
  };



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
      
      <Form
      onSubmit={handleFormSubmit}
      >
        <div>
            <h3>Search By Category:</h3>
            <select id="ddlViewBy"
                name='category'
                onChange={categoryChange}
                // value={skillFormData.category}
                >
              <option value={"Sports"}>Sports</option>
              <option value={'Academics'}>Academics</option>
              <option value={'Culinary'}>Culinary</option>
              <option value={'Tech'}>Tech</option>
              <option value={'Mechanics'}>Mechanics</option>
              <option value={'Financial'}>Financial</option>
            </select> 
            <Button
              type='submit'
              onClick={() => {
                // window.location.reload();
              }}
            >
              Search Skills
            </Button>
          </div>
        </Form>
        {searched ?
        <SkillsList
              skills={skills}
              title={categoryValue}
            /> : <p></p> }
      </section>
      
    );
};

export default AppHome;
