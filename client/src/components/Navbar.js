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
      <div>
        <Link className='text-dark' to='/'>
          <p className='m-0' style={{ fontSize: '24px' }}>
            Home
          </p>
        </Link>

        <Link className='text-dark' to='/user'>
          <p className='m-0' style={{ fontSize: '24px' }}>
            User
          </p>
        </Link>

        <p>{message}</p>

        <Link className='text-dark' to='/singout'>
          <p href='/' onClick={() => Auth.logout()}>
            Logout
          </p>
        </Link>
      </div>
    );
  } else
    return (
      <div>
        {/* <Link className='text-dark' to='/'>
          <p className='m-0' style={{ fontSize: '24px' }}>
            Home
          </p>
        </Link> */}

        {/* <Link className='text-dark' to='/user'>
          <p className='m-0' style={{ fontSize: '24px' }}>
            User
          </p>
        </Link> */}

        <Link className='text-dark' to='/login'>
          <p className='m-0' style={{ fontSize: '24px' }}>
            Login
          </p>
        </Link>
        <Link className='text-dark' to='/singup'>
          <p className='m-0' style={{ fontSize: '24px' }}>
            SingUp
          </p>
        </Link>
      </div>
    );
};

export default AppNavbar;
