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

    return (
      <header>
        <nav className='navigation'>
          <a to='/'>
            <img src='./images/logo.png' alt='home' />
          </a>

          <a to='/user'>
            <a className='m-0' style={{ fontSize: '24px' }}>
              User
            </a>
          </a>

          <a>{message}</a>

          <a to='/'>
            <a href='/' onClick={() => Auth.logout()}>
              Logout
            </a>
          </a>
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
