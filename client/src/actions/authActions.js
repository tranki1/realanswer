import axios from 'axios';
/*eslint-disable */
import jwt_decode from 'jwt-decode';
/* eslint-enable */
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// Login - Get User token
export const loginUser = userData => (dispatch) => {
  axios
    .post('api/users/login', userData)
    .then((res) => {
      // Save local storage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      /*eslint-disable */
      dispatch(setCurrentUser(decoded));
      /* eslint-enable */
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};
// SET LOGIN USER
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// Log out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // set current user to empty object which will set authenticated to false
  dispatch(setCurrentUser({}));
};
