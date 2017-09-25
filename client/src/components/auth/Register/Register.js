import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

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
    };
    console.log(newUser);
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row my-4">
            <div className="m-auto">
              <h1 className="display-4 text-center">JOIN US</h1>
              <p className="lead text-center">To get expert consulting for pregnancy & parenting</p>
              <form onSubmit={this.onSubmitHandler} action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    required
                    onChange={this.onchangeHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control "
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onchangeHandler}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control "
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onchangeHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control "
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onchangeHandler}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
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

export default Register;
