import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestionById } from '../../../actions/questionActions';
import Spinner from '../../common/Spinner/Spinner';
import QuestionItem from '../QuestionItem/QuestionItem';
import AnswerForm from '../../answer/AnswerForm';
import AnswerFeed from '../../answer/AnswerFeed';

class Question extends Component {
  componentDidMount() {
    this.props.getQuestionById(this.props.match.params.id);
  }

  render() {
    const { question, loading } = this.props.question; //eslint-disable-line
    let questionItem;
    if (question === null || loading || Object.keys(question).length === 0) {
      questionItem = <Spinner />;
    } else {
      questionItem = (
        <div>
          <QuestionItem question={question} showActions={false} />
          <AnswerForm questionId={question._id} />
          <AnswerFeed questionId={question._id} answers={question.answers} />
        </div>
      );
    }
    return (
      <div className="question">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className=" mb-3">
                Back to Feed
              </Link>
              {questionItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  /*eslint-disable*/
  getQuestionById: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  /* eslint-enable */
};
const mapStateToProps = state => ({
  question: state.question,
});
export default connect(
  mapStateToProps,
  { getQuestionById },
)(Question);
