import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/InputGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import { addQuestion } from '../../../actions/questionActions';

import './QuestionForm.css';

class QuestionForm extends Component {
  state = {
    text: '',
    ageandstage: '',
    errors: {},
    topics: '',
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
    const newQuestion = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      ageandstage: this.state.ageandstage,
      topics: this.state.topics,
    };
    console.log(newQuestion);
    this.props.addQuestion(newQuestion, this.props.history);
    this.setState({ text: '' });
  };

  render() {
    const { errors } = this.state;
    const selectOptions = [
      { label: 'SELECT AGE AND STAGE', value: 0 },
      { label: 'Getting pregnant', value: 0, disabled: true },
      { label: 'Trying to conceive', value: 'Trying to conceive' },
      { label: 'Trouble Conceiving', value: 'Trouble Conceiving' },
      { label: 'Pregnancy', value: 0, disabled: true },
      { label: 'First trimester', value: 'First trimester' },
      { label: 'Second trimester', value: ' Second trimester' },
      { label: 'Third trimester', value: 'Third trimester' },
      { label: 'Parenting', value: 0, disabled: true },
      { label: 'First Week', value: 'First Week' },
      { label: '0 - 3 months', value: '0 - 3 months' },
      { label: '7 - 9 months', value: '7 - 9 months' },
      { label: '10 - 12 months', value: '10 - 12 months' },
      { label: '12 - 18 months', value: '12 - 18 months' },
      { label: '18 - 24 months', value: '18 - 24 months' },
      { label: '24 - 36 months', value: '24 - 36 months' },
    ];
    return (
      <div id="questions-new" className="main">
        <div className="top-helper container">
          <div className="page-title ">ASK A QUESTION</div>
        </div>
        <div className="ask-question-section mx-auto">
          <div className="post-form mb-3">
            <div className="guideline">
              <div>
                <p>Search for existing questions first.</p>
                <p>Remember all posts are public and searchable.</p>
                <p>
                  When in doubt, check the
                  <a className="teal-link" href="/real-answers/guidelines" target="_blank">
                    guidelines.
                  </a>
                </p>
                <a className="teal-link got-it" href="/">
                  OK, GOT IT!
                </a>
              </div>
            </div>
            <div className="container">
              <div className="container">
                <div className="ask-caption">ASK</div>

                <form onSubmit={this.onSubmitHandler}>
                  <div className="card card-info">
                    <div className="card-body custom">
                      <TextAreaFieldGroup
                        placeholder="What would you like to know?"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChangeHandler}
                        error={errors.text}
                      />
                    </div>
                  </div>
                  <SelectListGroup
                    name="agsandstags"
                    value={this.state.ageandstage}
                    onChange={this.onChangeHandler}
                    options={selectOptions}
                    error={errors.text}
                  />
                  <TextFieldGroup
                    placeholder="Topics"
                    name="topics"
                    value={this.state.topics}
                    onChange={this.onChangeHandler}
                    error={errors.topics}
                    info="Please use comma separated values"
                  />
                  <div className="row">
                    <button
                      type="submit"
                      className="mbtn btn-custom btn-info my-2 py-2 px-4 mx-auto "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { addQuestion },
)(withRouter(QuestionForm));
