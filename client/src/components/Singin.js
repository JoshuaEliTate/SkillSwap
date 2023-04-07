import React, { useState } from 'react';

const AppSingin = () => {
  return (
    <header className='App-header'>
      <h1>Login</h1>
      <p>Username:</p>
      <input
        type='username'
        placeholder='your username'
        name='username'
      ></input>
      <p>Email:</p>
      <input type='email' placeholder='your email' name='email'></input>
      <p>password:</p>
      <input
        type='password'
        placeholder='your password'
        name='password'
      ></input>
      <button type='submit'>Submit</button>
    </header>
  );
};

export default AppSingin;
