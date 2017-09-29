import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import './Navbar.css';

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLink = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={this.onLogoutClick}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              tittle="You must have gravatar connected to your email to display avatar"
            />{' '}
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLink = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Join us
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm  navbar-toggleable-md navbar-light bg-faded">
        {/* <div className="container"> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
          controls="navbarMobile"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav-left">
          <ul className="nav navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                real answer
              </Link>
            </li>
          </ul>
        </div>
        <Link className="navbar-brand mx-auto small-logo-text" id="logo" to="/">
          the
          <span className="logo-text">mama</span>
          club
        </Link>
        <div className="collapse navbar-collapse">{isAuthenticated ? authLink : guestLink}</div>

        {/*  Mobile */}
        <div className="collapse navbar-collapse" id="mobile-nav">
          {isAuthenticated ? authLink : guestLink}
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Mobile Link
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Mobile Link
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Mobile Link
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Mobile Link
              </Link>
            </li>
          </ul>
        </div>
        {/* </div> */}
      </nav>
    );
  }
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateProps,
  { logoutUser },
)(Navbar);
