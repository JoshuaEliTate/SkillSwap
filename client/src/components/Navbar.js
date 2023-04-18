import React, { useState, useContext } from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

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
          <Link to='/'>Home</Link>
          <Link to='/user'>User</Link>
          <a>{message}</a>
          <Link
            to='/'
            className='btnLogin-popup'
            onClick={() => {
              Auth.logout();
              // window.location.reload();
            }}
          >
            Logout
          </Link>
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
              // window.location.reload();
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