import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
/* eslint-disable */
import jwt_decode from 'jwt-decode';
/* eslint-enable */
import { Provider } from 'react-redux';
import setAuthtoken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import store from './store';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import SideNavbar from './components/layout/SideNavbar/SideNavbar';
import Footer from './components/layout/Footer/Footer';
import Landing from './components/layout/Landing/Landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

// Check for token
if (localStorage.jwtToken) {
  // SET the auth token header auth
  setAuthtoken(localStorage.jwtToken);
  // Decode token and get user infor and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
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
      </div>
    </Router>
  </Provider>
);

export default App;
