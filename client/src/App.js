import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import Home from './pages/Home';
import User from './pages/User';
import Singup from './pages/Singup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar></Navbar>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<User />} />
            <Route path='/singup' element={<Singup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>

        <div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
