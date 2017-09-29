import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';

import './Register.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    username: '',
    password: '',
    password2: '',
    errors: {},
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onchangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      username: this.state.username,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const {
      name, errors, email, password, password2, username,
    } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row my-4">
            <div className="m-auto">
              <h1 className="display-4 text-center">JOIN US</h1>
              <p className="lead text-center">To get expert consulting for pregnancy & parenting</p>
              <form noValidate onSubmit={this.onSubmitHandler} action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control', {
                      'is-invalid': errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={name}
                    required
                    onChange={this.onchangeHandler}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control', {
                      'is-invalid': errors.username,
                    })}
                    placeholder="Community username"
                    name="username"
                    value={username}
                    required
                    onChange={this.onchangeHandler}
                  />
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control ', {
                      'is-invalid': errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onchangeHandler}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control ', {
                      'is-invalid': errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onchangeHandler}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control ', {
                      'is-invalid': errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={this.onchangeHandler}
                  />
                  {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                </div>
                <div className="form-group">
                  <div className="row">
                    <input
                      type="submit"
                      className="btn btn-custom btn-info my-2 py-2 px-4 mx-auto "
                      value="SIGN UP"
                    />
                  </div>
                </div>
                <div className="row text-center mx-4">
                  <small>
                    By signing up, I agree to theMAMAclub’s
                    <Link to="/policy">Privacy Policy and Terms of Use</Link> and
                    <Link to="/terms"> Terms of Use.</Link>
                  </small>
                </div>
              </form>
              <div className="join-fallback mt-3 mb-4">
                <h3 className="display-6 text-center">ALREADY A MEMBER?</h3>
                <button type="button" className="btn btn-block mt-4">
                  <Link to="/login">Log in</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*eslint-disable*/
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { registerUser },
)(withRouter(Register));
