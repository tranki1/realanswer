import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* eslint-disable */
import jwt_decode from 'jwt-decode';
/* eslint-enable */
import { Provider } from 'react-redux';
import setAuthtoken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import SideNavbar from './components/layout/SideNavbar/SideNavbar';
import Footer from './components/layout/Footer/Footer';
import Landing from './components/layout/Landing/Landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Account from './components/account/Account';
import Questions from './components/questions/Questions';
import QuestionForm from './components/questions/QuestionForm/QuestionForm';

// Check for token
if (localStorage.jwtToken) {
  // SET the auth token header auth
  setAuthtoken(localStorage.jwtToken);
  // Decode token and get user infor and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

// Check for exp token

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
            <Route exact path="/feed" component={Questions} />
            <Switch>
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute exact path="/questions/new" component={QuestionForm} />
              {/* <PrivateRoute exact path="/add-profile" component={AddProfile} /> */}
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;
