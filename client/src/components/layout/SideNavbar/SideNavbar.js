import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import './SideNavbar.css';

class SideNavbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLink = (
      <div>
        <div className="user-avatar">
          <img className="rounded-circle" src={user.avatar} alt={user.name} />
        </div>
        <div className="user-name mt-2 title">{user.username}</div>
      </div>
    );
    const guestLink = (
      <div className="left-rail-row">
        <Link className="title" to="/register">
          JOIN US
        </Link>
        <Link className="title" to="/login">
          Login
        </Link>
      </div>
    );
    return (
      <div id="user-column">
        <div className="menu-user-info">
          {isAuthenticated ? authLink : guestLink}
          <div className="left-rail-row">
            <div className="title">BROWSE</div>
            <Link className="menu-link" to="/">
              HOME
            </Link>
            {isAuthenticated ? (
              <Link className="menu-link" to="/questions/new">
                ASK
              </Link>
            ) : null}
            <Link className="menu-link" to="/feed">
              Feed
            </Link>
            <Link className="menu-link" to="/topics">
              Topics
            </Link>
            <Link className="menu-link" to="/ageandstages">
              Ages & stages
            </Link>
          </div>
          {isAuthenticated ? (
            <div className="left-rail-row">
              <Link className="menu-link" to="/" onClick={this.onLogoutClick}>
                Logout
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
SideNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateProps,
  { logoutUser },
)(SideNavbar);
