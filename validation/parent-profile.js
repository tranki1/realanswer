const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateParentProfileInput(data) {
  let errors = {};
  data.childname = !isEmpty(data.childname) ? data.childname : '';
  data.babysex = !isEmpty(data.babysex) ? data.babysex : '';
  data.babybirthday = !isEmpty(data.babybirthday) ? data.babybirthday : '';

  if (validator.isEmpty(data.childname)) {
    errors.childname = "Child's name field is required";
  }
  if (validator.isEmpty(data.babysex)) {
    errors.babysex = 'Baby sex field is required';
  }
  if (validator.isEmpty(data.babybirthday)) {
    errors.babybirthday = "Baby's birthday field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
