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

  const [search, setSearch] = useState('');
  const [catSearch, setCatSearch] = useState('');
  const [filteredData, setFilteredData] = useState();

  const handleChange = (e) => {
    const searchValue = e.target.value;
    console.log(skills)
    setSearch(searchValue);
    if(searchValue == ''){
      return 
    }
  
    const filtered = skills?.filter(item => {
      return item.skillName?.includes(searchValue);
    });
    setFilteredData(filtered);
  };

  const handleCategoryChange = (e) => {
    console.log(e)
    const searchValue = e.target.value;
    console.log(skills)
    setCatSearch(searchValue);
  
    const filtered = skills?.filter(item => {
      return item.category?.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredData(filtered);
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
          <Form.Control value={search} onChange={handleChange} type='search' placeholder='Search skills' />
        </Form.Group>

      </Form>

      


      <Form>
            <h3>Search By Category:</h3>
            <select id="ddlViewBy"
                name='category'
                onChange={handleCategoryChange}
                // value={skillFormData.category}
                >
              <option value={"sports"}>Sports</option>
              <option value={'academics'}>Academics</option>
              <option value={'culinary'}>Culinary</option>
              <option value={'tech'}>Tech</option>
              <option value={'mechanics'}>Mechanics</option>
              <option value={'financial'}>Financial</option>
            </select> 
        </Form>
      
      <ul>
        {Array.isArray(filteredData) && filteredData.map((item,index)=> 
          <li key={index}>
            <h3>Filtered Skills</h3>
            <p>{item.skillName}</p>
          </li>
        )}
      </ul>

      </section>
      
    );
};

export default AppHome;



//   {searched ?
//   <SkillsList
//         skills={skills}
//         title={categoryValue}
//       /> : <p></p> }

// button for searching for skills
//  <Button variant='primary' type='submit'>
// Search
// </Button> 