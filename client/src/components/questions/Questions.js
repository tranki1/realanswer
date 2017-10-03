import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import QuestionForm from './QuestionForm/QuestionForm';
import Spinner from '../common/Spinner/Spinner';

class Questions extends Component {
  render() {
    return (
      <div className="question">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <QuestionForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Questions;
