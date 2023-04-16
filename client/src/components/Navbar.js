import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Auth from '../utils/auth';
import { isClose } from '../App';

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
        <h2 className='logo'>Logo</h2>
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
