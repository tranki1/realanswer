import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/authActions';
import Spinner from '../common/Spinner/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import isEmpty from '../../validation/is-empty';

import './Account.css';

class Account extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    gender: '',
    zipcode: '',
    avatar: '',
    errors: {},
  };

  componentDidMount() {
    console.log(this.props.auth);

    const user = this.props.auth.user;

    // Check if user doesn't exist, then make empty string
    user.address = !isEmpty(user.address) ? user.address : '';
    user.zipcode = !isEmpty(user.zipcode) ? user.zipcode : '';
    user.city = !isEmpty(user.city) ? user.city : '';
    user.phone = !isEmpty(user.phone) ? user.phone : '';
    user.gender = !isEmpty(user.gender) ? user.gender : '';

    // set component fields state
    this.setState({
      address: user.address,
      zipcode: user.zipcode,
      city: user.city,
      gender: user.gender,
      phone: user.phone,
      email: user.email,
      username: user.username,
      name: user.name,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const UserData = {
      address: this.state.address,
      zipcode: this.state.zipcode,
      city: this.state.city,
      gender: this.state.gender,
      phone: this.state.phone,
      email: this.state.email,
      username: this.state.username,
      name: this.state.name,
    };

    this.props.updateUser(UserData, this.props.history);
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      email,
      name,
      username,
      phone,
      address,
      city,
      zipcode,
      gender,
      avatar,
      errors,
    } = this.state;

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
                    <img className="rounded-circle" src={this.props.auth.user.avatar} alt={name} />
                  </div>

                  <div className="username-email">
                    <p className="username">{username}</p>
                    <p className="accountemail">{email}</p>
                  </div>
                </div>
                <div className="my-5 mx-auto about-me">
                  <form noValidate onSubmit={this.onSubmitHandler} action="create-profile.html">
                    <TextFieldGroup
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={this.onChangeHandler}
                      error={errors.name}
                    />
                    <TextFieldGroup
                      type="text"
                      placeholder="Community username"
                      name="username"
                      value={username}
                      onChange={this.onChangeHandler}
                      error={errors.username}
                    />
                    <TextFieldGroup
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={this.onChangeHandler}
                      error={errors.email}
                      info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                    />
                    <TextFieldGroup
                      type="phone"
                      placeholder="Phone number"
                      name="phone"
                      value={phone}
                      onChange={this.onChangeHandler}
                      error={errors.phone}
                    />
                    <TextFieldGroup
                      type="address"
                      placeholder="Address"
                      name="address"
                      value={address}
                      onChange={this.onChangeHandler}
                      error={errors.address}
                    />
                    <TextFieldGroup
                      type="city"
                      placeholder="City"
                      name="city"
                      value={city}
                      onChange={this.onChangeHandler}
                      error={errors.city}
                    />

                    <TextFieldGroup
                      type="zipcode"
                      placeholder="Zipcode"
                      name="zipcode"
                      value={zipcode}
                      onChange={this.onChangeHandler}
                      error={errors.zipcode}
                    />
                    <TextFieldGroup
                      type="gender"
                      placeholder="Gender"
                      name="gender"
                      value={gender}
                      onChange={this.onChangeHandler}
                      error={errors.gender}
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
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { updateUser },
)(withRouter(Account));
