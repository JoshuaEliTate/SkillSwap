import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

const AppNavbar = () => {
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
