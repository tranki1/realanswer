import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../../common/Spinner/Spinner';
import { getQuestions } from '../../../actions/questionActions';
import QuestionFeed from '../QuestionFeed/QuestionFeed';

import './Questions.css';

class Questions extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  render() {
    const { questions, loading } = this.props.question;
    let questionContent;
    if (questions === null || loading) {
      questionContent = <Spinner />;
    } else {
      questionContent = <QuestionFeed questions={questions} />;
    }

    return (
      <div className="question main">
        <div className="top-helper ">
          <div className="page-title headerbackground">NEWEST QUESTIONS</div>
        </div>
        <div className="questions-feed container">{questionContent}</div>
      </div>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  question: state.question,
});
export default connect(
  mapStateToProps,
  { getQuestions },
)(Questions);
