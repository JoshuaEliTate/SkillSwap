import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Auth from '../utils/auth';

const AppNavbar = () => {
  if (Auth.loggedIn()) {
    //random Greetings
    const user = Auth.getUser().data || {};
    const greetings = ['Hello', 'Hi', 'Hey', 'Greetings', 'Welcome'];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    const greeting = greetings[randomIndex];
    const message = `${greeting}, ${user.username}`;
    // const logoutClick = () => {
    //   Auth.logout();
    //   window.location.reload();
    // };

    return (
      <header>
        <nav className='navigation'>
          <h2 className='logo'>Logo</h2>

          <a to='/user'>User</a>

          <a>{message}</a>

          <button
            onClick={() => {
              Auth.logout();
              window.location.reload();
            }}
            className='btnLogin-popup'
          >
            Logout
          </button>
        </nav>
      </header>
    );
  } else
    return (
      <header>
        <h2 className='logo'>Logo</h2>
        <nav className='navigation'>
          <a href='#'>Home</a>
          <a href='#'>About</a>
          <a href='#'>Services</a>
          <a href='#'>Contact</a>
          <button className='btnLogin-popup'>Login</button>
        </nav>
      </header>
    );
};

export default AppNavbar;
