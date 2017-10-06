import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteQuestion, addLike, removeLike } from '../../../actions/questionActions';

import './QuestionItem.css';

class QuestionItem extends Component {
  onDeleteHandler = (id) => {
    this.props.deleteQuestion(id); // eslint-disable-line
  };

  onLikeHandler = (id) => {
    this.props.addLike(id); // eslint-disable-line
  };

  onUnlikeHandler = (id) => {
    this.props.removeLike(id); // eslint-disable-line
  };

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    }
    return false;
  };

  render() {
    const { question, auth } = this.props;
    return (
      <div className="questions-item">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-2">
              <Link to="/">
                <img className=" img-fluid rounded-circle " src={question.avatar} alt="" />
              </Link>
              <br />
              <p className="text-center">{question.name}</p>
            </div>
            <div className="col-10">
              <p>{question.text}</p>

              <button
                type="button"
                onClick={() => this.onLikeHandler(question._id)} /* eslint-disable-line */
                className="btn  mr-1"
              >
                <i
                  className={classnames('fas fa-thumbs-up', {
                    'text-info': this.findUserLike(question.likes),
                  })}
                />

                <span className="badge badge-light">{question.likes.length}</span>
              </button>
              <button
                type="button"
                onClick={this.onUnlikeHandler.bind(this, question._id)} /* eslint-disable-line */
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              {/* eslint-disable-next-line */}
              <Link to={`/question/${question._id}`} className="btn mr-1">
                {question.answers.length} MOM ANSWERS
              </Link>
              {question.user === auth.user.id ? (
                /*eslint-disable*/
                <button
                  type="button"
                  onClick={() => this.onDeleteHandler(question._id)}
                  className="btn  mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : /* eslint-enable */
                null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*eslint-disable*/
QuestionItem.propTypes = {
  deleteQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
/* eslint-enable */
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { deleteQuestion, addLike, removeLike },
)(QuestionItem);
