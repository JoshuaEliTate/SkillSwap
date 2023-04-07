import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <div>
      <ul>
        <li>Home</li>
        <li>Login</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default AppNavbar;
