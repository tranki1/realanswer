const isEmpty = value => value === undefined
  || value === null
  // if empty object or empty string
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);
export default isEmpty;
