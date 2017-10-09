import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAnswer } from '../../actions/questionActions';

import './Answer.css';

class AnswerItem extends Component {
  onDeleteHandler = (questionId, answerId) => {
    this.props.deleteAnswer(questionId, answerId); // eslint-disable-line
  };

  render() {
    const { answer, auth, questionId } = this.props;
    return (
      <div className="answers-item">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-2">
              <Link to="/">
                <img className=" img-fluid rounded-circle " src={answer.avatar} alt="" />
              </Link>
              <br />
              <p className="text-center">{answer.username}</p>
            </div>
            <div className="col-10">
              <p>{answer.text}</p>
              <button
                type="button"
                onClick={() => this.onDeleteHandler(questionId, answer._id)}
                className="btn  mr-1"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*eslint-disable*/
AnswerItem.propTypes = {
  deleteAnswer: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  questionId: PropTypes.string.isRequired,
};
/* eslint-enable */
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { deleteAnswer },
)(AnswerItem);
