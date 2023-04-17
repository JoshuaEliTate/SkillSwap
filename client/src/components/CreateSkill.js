import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_SKILL } from '../utils/mutations';
import { createSkill } from '../utils/API';
import { useMutation } from '@apollo/client';

const SkillCreate = () => {
  const [skillFormData, setSkillFormData] = useState({
    skillName: '',
    description: '',
    price: '',
    category: ''
  });
  const [validated] = useState(false);
  const [addSkill, { error, data }] = useMutation(ADD_SKILL);

  const handleInputChange = (event) => {
    console.log(event.target)
    let { name, value } = event.target;
    if (name == 'price') {
      value = parseInt(value);
    }else if (name == 'category'){
      value = value
    }
    console.log(name)
    console.log(value)

    setSkillFormData({ ...skillFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    console.log(skillFormData.description);
    console.log(skillFormData.category);

    try {
      const { response } = await addSkill({ variables: { ...skillFormData } });

      if (!response) {
        console.log(response)
        console.log({...skillFormData});
        console.log('error');
        throw new Error('something went wrong!');
      }

      const { token, skill } = response.json();
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }

    setSkillFormData({
      skillName: '',
      description: '',
      price: '',
      category: ''
    });
  };

  return (
    <div className='profile'>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <div>
          <h2>Create Skill</h2>
          <p>skill:</p>
          <input
            type='text'
            placeholder='your skill'
            name='skillName'
            onChange={handleInputChange}
            value={skillFormData.skillName}
          ></input>

          <p>description:</p>
          <input
            type='text'
            placeholder='your description'
            name='description'
            onChange={handleInputChange}
            value={skillFormData.description}
          ></input>

          <p>price:</p>
          <input
            type='text'
            placeholder='your price'
            name='price'
            onChange={handleInputChange}
            value={skillFormData.price}
          ></input>

          <p>category:</p>
          <select id="ddlViewBy"
          name='category'
          onChange={handleInputChange}
          // value={skillFormData.category}
          >
            <option value={"Sports"} selected="selected">Sports</option>
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
            Create Skill
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SkillCreate;
