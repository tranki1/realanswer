import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../../common/Spinner/Spinner';
import TextFieldGroup from '../../common/TextFieldGroup';

import './Account.css';

class Account extends Component {
  state = {
    errors: {},
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const {
      email, name, username, password, password2, phone,
    } = this.props.auth.user;
    const { errors } = this.state;
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else if (
      // Check if there is profile for this user
      Object.keys(profile).length > 0
    ) {
      profileContent = <h4>MY PROFILES</h4>;
    } else {
      profileContent = (
        <div>
          <p>Please add your profiles for better information</p>
        </div>
      );
    }

    return (
      <div className="account">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 accounttitle headerbackground">ACCOUNT</h1>
              <div className="menu-user-info">
                <div className="user-menu-avatar headerbackground pb-3">
                  <div className="user-avatar">
                    <img className="rounded-circle" src={user.avatar} alt={user.name} />
                  </div>

                  <div className="username-email">
                    <p className="username">{user.username}</p>
                    <p className="accountemail">{user.email}</p>
                  </div>
                </div>
                <div className="my-5 mx-auto about-me">
                  <form noValidate onSubmit={this.onSubmitHandler} action="create-profile.html">
                    <TextFieldGroup
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={this.onchangeHandler}
                      error={errors.name}
                    />
                    <TextFieldGroup
                      type="text"
                      placeholder="Community username"
                      name="name"
                      value={username}
                      onChange={this.onchangeHandler}
                      error={errors.username}
                    />
                    <TextFieldGroup
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={this.onchangeHandler}
                      error={errors.email}
                      info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                    />
                    <TextFieldGroup
                      type="phone"
                      placeholder="Phone number"
                      name="phone"
                      value={phone}
                      onChange={this.onchangeHandler}
                      error={errors.phone}
                    />
                    <TextFieldGroup
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.onchangeHandler}
                      error={errors.password}
                    />
                    <TextFieldGroup
                      type="password"
                      placeholder="Confirm password"
                      name="password2"
                      value={password2}
                      onChange={this.onchangeHandler}
                      error={errors.password2}
                    />

                    <TextFieldGroup
                      type="password"
                      placeholder="Confirm password"
                      name="password2"
                      value={password2}
                      onChange={this.onchangeHandler}
                      error={errors.password2}
                    />
                    <div className="form-group">
                      <div className="row">
                        <input
                          type="submit"
                          className="btn btn-custom btn-info my-2 py-2 px-4 mx-auto "
                          value="UPDATE"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="profiles text-center my-5">
                <h4>MY PROFILES</h4>
                {profileContent}
                <Link className="btn" type="button" to="/add-profile">
                  + ADD PROFILE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { getCurrentProfile },
)(Account);
