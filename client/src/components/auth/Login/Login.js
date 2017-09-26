import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };

  onchangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('api/users/login', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { errors, email, password } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row my-5">
            <div className="m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to the Mama club</p>
              <form noValidate onSubmit={this.onSubmitHandler} action="dashboard.html">
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control', {
                      'is-invalid': errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onchangeHandler}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control', {
                      'is-invalid': errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onchangeHandler}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

              <div className="join-fallback mt-3 mb-4">
                <h3 className="display-6 text-center">NEW TO THE CLUB</h3>
                <button type="button" className="btn btn-block mt-4">
                  <Link to="/register">Join now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
