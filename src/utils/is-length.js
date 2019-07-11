// https://github.com/lodash/lodash/blob/master/isLength.js

const MAX_SAFE_INTEGER = 9007199254740991

export default value =>
  typeof value === 'number' &&
  value > -1 &&
  value % 1 === 0 &&
  value <= MAX_SAFE_INTEGER
