import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';


const AppHome = () => {
  return (
    <Form>
      <header className='App-header'>
        <h1>Home</h1>
        <p>Search user:</p>
        <input type='search' placeholder='Search users'></input>
        <button type='submit'>Submit</button>

        <p>Search skill:</p>
        <input type='search' placeholder='Search skills'></input>
        <button type='submit'>Submit</button>
      </header>
    </Form>
  );
};

export default AppHome;
