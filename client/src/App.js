import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import SideNavbar from './components/layout/SideNavbar/SideNavbar';
import Footer from './components/layout/Footer/Footer';
import Landing from './components/layout/Landing/Landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

const App = () => (
  <div className="App">
    <Router>
      <div className="App">
        <Navbar />
        <div id="main">
          <SideNavbar />
          <Route exact path="/" component={Landing} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  </div>
);

export default App;
