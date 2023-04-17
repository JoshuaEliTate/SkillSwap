import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import User from './pages/User';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Prev } from 'react-bootstrap/esm/PageItem';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />

        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<User />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>

      {/* <Footer /> */}
    </ApolloProvider>
  );
}

export default App;
