import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { createSkill } from '../utils/API';

const SkillCreate = () => {
  const [skillFormData, setSkillFormData] = useState({
    skillName: '',
    description: '',
    price: '',
  });
  const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSkillFormData({ ...skillFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;

    try {
      const response = await createSkill(skillFormData);

      if (!response.ok) {
        console.log(skillFormData);
        // createUser(userFormData);
        throw new Error('something went wrong!');
      }

      const { token, skill } = await response.json();
      console.log(skillFormData);
    } catch (err) {
      console.error(err);
    }

    setSkillFormData({
        skillName: '',
        description: '',
        price: '',
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <header className='App-header'>
        <h1>Create Skill</h1>
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
        <button type='submit'>Create Skill</button>
      </header>
    </Form>
  );
};

export default SkillCreate;