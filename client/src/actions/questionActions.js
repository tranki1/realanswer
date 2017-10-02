import axios from 'axios';
import { ADD_QUESTION, GET_ERRORS } from './types';

export const addQuestion = questionData => (dispatch) => {
  axios
    .post('/api/questions')
    .then((res) => {
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
