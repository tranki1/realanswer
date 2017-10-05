import axios from 'axios';
import {
  ADD_QUESTION,
  GET_ERRORS,
  GET_QUESTION,
  GET_QUESTIONS,
  QUESTION_LOADING,
  DELETE_QUESTION,
  CLEAR_ERRORS,
} from './types';

export const addQuestion = (questionData, history) => (dispatch) => {
  axios
    .post('/api/questions', questionData)
    .then((res) => {
      history.push('/feed');
      dispatch({
        type: ADD_QUESTION,
        payload: res.data,
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// get questions
export const getQuestions = () => (dispatch) => {
  dispatch(setLoadingState());
  axios
    .get('/api/questions')
    .then((res) => {
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_QUESTIONS,
        payload: null,
      });
    });
};
// Get Question By ID
export const getQuestionById = id => (dispatch) => {
  dispatch(setLoadingState());
  axios
    .get(`/api/questions/${id}`)
    .then((res) => {
      dispatch({
        type: GET_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_QUESTION,
        payload: null,
      });
    });
};
// Delete question
export const deleteQuestion = questionId => (dispatch) => {
  axios
    .delete(`/api/questions/${questionId}`)
    .then((res) => {
      dispatch({
        type: DELETE_QUESTION,
        payload: questionId,
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// Add likes
export const addLike = id => (dispatch) => {
  axios
    .post(`/api/questions/like/${id}`)
    .then(res => dispatch(getQuestions()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// remove likes
export const removeLike = id => (dispatch) => {
  axios
    .post(`/api/questions/unlike/${id}`)
    .then(res => dispatch(getQuestions()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};
// add annswer
export const addAnswer = (questionId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/questions/answer/${questionId}`, commentData)
    .then((res) => {
      dispatch({
        type: GET_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Delete Comment
export const deleteComment = (questionId, commentId) => (dispatch) => {
  axios
    .delete(`/api/questions/comment/${questionId}/${commentId}`)
    .then(res => dispatch({
      type: GET_QUESTION,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// Set loading state
export const setLoadingState = () => ({ type: QUESTION_LOADING });

// clear errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
