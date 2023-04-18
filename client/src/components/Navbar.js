import React, { useState, useContext } from 'react';
import Auth from '../utils/auth';

const AppNavbar = () => {
  if (Auth.loggedIn()) {
    //random Greetings
    const user = Auth.getUser().data || {};
    const greetings = ['Hello'];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    const greeting = greetings[randomIndex];
    const message = `${greeting}, ${user.username}`;

    return (
      <header>
        <h2 className='logo'>SkillSwap</h2>
        <nav className='navigation'>
          <a href='/'>Home</a>
          <a href='/user'>User</a>
          <a>{message}</a>
          <button
            href='/'
            className='btnLogin-popup'
            onClick={() => {
              Auth.logout();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </nav>
      </header>
    );
  } else
    return (
      <header>
        <h1 className='logo'>SkillSwap</h1>
        <nav className='navigation'>
          <button
            className='btnLogin-popup'
            onClick={() => {
              window.location.reload();
            }}
          >
            Login
          </button>
        </nav>
      </header>
    );
};

export default AppNavbar;

{/* <a href='/'>Home</a>
<a href='#'>About</a>
<a href='#'>Services</a>
<a href='#'>Contact</a> */}