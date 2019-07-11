import SYMBOL_ITERATOR from './symbol-iterator'
import isArrayLike from './is-array-like'
import isSet from './is-set'
import isFunction from './is-function'
import isValue from './is-value'

function isIterable(value) {
  if (
    isValue(value) &&
    (isFunction(value[SYMBOL_ITERATOR]) || isArrayLike(value) || isSet(value))
  ) {
    return true
  }

  return false
}

export default isIterable
