import isLength from './is-length'
import isValue from './is-value'
import isFunction from './is-function'

function isArrayLike(value) {
  return isValue(value) && !isFunction(value) && isLength(value.length)
}

export default isArrayLike
