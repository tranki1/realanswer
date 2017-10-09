import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addAnswer } from '../../actions/questionActions';

import './Answer.css';

class AnswerForm extends Component {
  state = {
    text: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { questionId } = this.props;
    const newAnswer = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    this.props.addAnswer(questionId, newAnswer);
    this.setState({ text: '' });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="answer-question mx-auto">
        <div className="post-form mb-3">
          <div className="container">
            <div className="container">
              <div className="ask-caption text-center">ANSWER</div>
              <div className="guideline">
                <p>Be respectful. Keep it relevant.</p>
                <p>Remember all posts are public and searchable.</p>
                <p>
                  When in doubt, check the
                  <a className="teal-link" href="/real-answers/guidelines" target="_blank">
                    guidelines.
                  </a>
                </p>
              </div>
              <form onSubmit={this.onSubmitHandler}>
                <div className="custom card card-info">
                  <div className="card-body custom">
                    <TextAreaFieldGroup
                      placeholder="Write your answer"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChangeHandler}
                      error={errors.text}
                    />
                  </div>
                </div>

                <div className="row">
                  <button
                    type="submit"
                    className="mbtn btn-custom btn-dark my-2 py-2 px-4 mx-auto "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AnswerForm.defaultProps = {
  questionId: '',
};

AnswerForm.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  questionId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { addAnswer },
)(AnswerForm);
