import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Appply to every request
    axios.defaults.headers.common.Authorization = token;
    // Delete auth header
    delete axios.defaults.headers.common.Authorization;
  }
};
export default setAuthToken;
