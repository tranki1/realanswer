const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
  let errors = {};
  //prevent the null and undefined value. Make sure the input is string for validator to work.
  data.address = !isEmpty(data.address) ? data.address : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  if (!validator.isLength(data.zipcode, { min: 5, max: 5 })) {
    errors.zipcode = 'zipcode needs to be 5 characters';
  }
  if (!validator.isLength(data.address, { max: 150 })) {
    errors.address = 'address is too long';
  }
  if (!validator.isLength(data.city, { max: 15 })) {
    errors.city = 'city is too long';
  }
  if (!validator.isMobilePhone(data.phone)) {
    errors.phone = 'invalid phone number';
  }
  if (!validator.isLength(data.zipcode, { min: 5, max: 5 })) {
    errors.zipcode = 'zipcode needs to be 5 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
