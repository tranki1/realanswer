const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePregnancyProfileInput(data) {
  let errors = {};
  data.expecting = !isEmpty(data.expecting) ? data.expecting : '';
  data.duedate = !isEmpty(data.duedate) ? data.duedate : '';
  if (validator.isEmpty(data.expecting)) {
    errors.expecting = 'I am expecting field is required';
  }
  if (validator.isEmpty(data.duedate)) {
    errors.duedate = 'Due date field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
