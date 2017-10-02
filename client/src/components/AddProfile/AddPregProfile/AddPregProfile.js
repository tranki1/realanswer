import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldInput from '../../common/TextFieldGroup';

class AddPregProfile extends Component {
  state = {
    expecting: '',
    duedate: '',
    errors: {},
  };

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/account" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">I'm Pregnant</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form action="add-experience.html">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="* Profile handle"
                    name="handle"
                    required
                  />
                  <small className="form-text text-muted">
                    A unique handle for your profile URL. Your full name, company name, nickname,
                    etc (This CAN'T be changed later)
                  </small>
                </div>
                <div className="form-group">
                  <select className="form-control form-control-lg" name="status">
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  <small className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Company"
                    name="company"
                  />
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPregProfile;
