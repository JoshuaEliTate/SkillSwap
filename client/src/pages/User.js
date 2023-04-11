import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AppUser = () => {
  return (
    <Form>
      <header className='App-header'>
        <h1>User Info</h1>
        <p>Username:</p>
        <p>Email:</p>
        <p>Skill:</p>
      </header>
    </Form>
  );
};

export default AppUser;
