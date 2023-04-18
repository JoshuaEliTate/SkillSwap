import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME, QUERY_SKILLS } from '../utils/queries';
import Login from './Login';

import SkillsList from '../components/SkillSearchAll';


import { getUser, getAllUsers } from '../utils/API';



const AppHome = () => {
  const [singleUser, setSingleUser] = useState({});
  const [allUsers, setAllUsers] = useState({});

  const [allSkills, setAllSkills] = useState({});
  const [singleSkill, setSingleSkill] = useState({});

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
    // setSearch('');
    const filtered = skills?.filter(item => {
      return item.skillName?.toLowerCase().includes(searchValue.toLowerCase());
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
    setSingleUser('')
  };

  const searchSkillsChange = (event) => {
    const { name, value } = event.target;
    setSingleSkill({ ...singleSkill, [name]: value });
  };
  const searchInputChange = (event) => {
    const { name, value } = event.target;
    setSingleUser({ ...singleUser, [name]: value });
  };
  const searchAllSkills = async (event) => {
    event.preventDefault();

    const skills = data?.skills || [];
    setAllSkills(skills);

    if (singleSkill.skillName) {
      let matchingSkill = null;
      for (let i = 0; i < allSkills.length; i++) {
        if (
          allSkills[i].skillName.toLowerCase() ===
          singleSkill.skillName.toLowerCase()
        ) {
          matchingSkill = allSkills[i];
          break;
        }
      }

      if (matchingSkill) {
        setAllSkills([matchingSkill]);
      } else {
        // If no matching skill was found
        setAllSkills([]);
        console.log('Skill not found');
      }
    }
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
      // console.log(allUsers);

      if (singleUser.username) {
        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].username.toLowerCase() === singleUser.username.toLowerCase()) {
            setAllUsers([allUsers[i]]);
            return;
          } else {
            setAllUsers([]);
          }
        }
        // setFilteredData('');
        // If we reach this point, no matching user was 
        return ;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!Auth.loggedIn()) {
    return <Login />;
  } else
    return (
      <div>
        <div className='centered'>
          <div className='search-box'>
            <form onSubmit={searchAllUser}>
              <label>Search user:</label>
              <br></br>
              <input
                type='search'
                name='username'
                onChange={searchInputChange}
                value={singleUser.username || ''}
              ></input>

              <button variant='primary' type='submit'>
                Search
              </button>
            </form>
            <form>
                <Form.Group>
                  <Form.Label>Search skill:</Form.Label>
                  <Form.Control value={search} onChange={handleChange} type='search' placeholder='Search skills' />
                </Form.Group>
            </form>
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
          </div>
        </div>
        <div className='card'>
          
        


      

    <ul>
      <li>

        </li>
        <li>
      <ul>
        {Array.isArray(filteredData) && filteredData.map((item,index)=> 
          <li key={index}>
            <ul>
            <li>_________________________</li>
            <li>{item.skillName}</li>
            <li>{item.description}</li>
            <li>${item.price}</li>
            <li>{item.user.username}</li>
            <li>{item.user.email}</li>
            </ul>
          </li>
        )}
      </ul>
      </li>
      </ul>
      {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <div className='container' key={user._id}>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Skill Count: {user.skills.length}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
      

            </div>



        <div className='result-box'>
          <div className='centered'>
            <div className='card'>

            </div>
            <div className='card'>
              {allSkills.length > 0 ? (
                allSkills.map((skill) => (
                  <div className='container' key={skill._id}>
                    <p>Category: {skill.category}</p>
                    <p>Skill name: {skill.skillName}</p>
                    <p>Description:{skill.description}</p>
                    <p>Instructor:{skill.user.username}</p>
                    <p>Email: {skill.user.email}</p>
                  </div>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>

    
      

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

              {/* <label>Search skill:</label>
              <input
                type='search'
                name='skillName'
                onChange={searchSkillsChange}
                value={singleSkill.skillName || ''}
              ></input> */}

              // {allUsers.length > 0 ? (
              //   allUsers.map((user) => (
              //     <div className='container' key={user._id}>
              //       <p>Username: {user.username}</p>
              //       <p>Email: {user.email}</p>
              //       <p>Skill Count: {user.skills.length}</p>
              //     </div>
              //   ))
              // ) : (
              //   <p></p>
              // )}