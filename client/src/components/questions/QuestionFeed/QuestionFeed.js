import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionItem from '../QuestionItem/QuestionItem';

import './QuestionFeed.css';

class QuestionFeed extends Component {
  render() {
    const { questions } = this.props;
    const QuestionItems = questions.map(question => (
      <QuestionItem key={question._id} question={question} />
    ));
    return <div className="questions-feed">{QuestionItems}</div>;
  }
}
QuestionFeed.propTypes = {
  questions: PropTypes.array.isRequired,
};
export default QuestionFeed;
