import hasLength from './has-length'
import getType from './get-type'
import isFunction from './is-function'

function isIterable(object) {
  if (!object || isFunction(object)) {
    return false
  }

  const type = getType(object)

  if (type === 'Null' || type === 'Undefined' || type === 'Number') {
    return false
  }

  if (hasLength(object)) {
    return true
  }

  try {
    const iterator = object[Symbol.iterator]()
    if (iterator && iterator.next && isFunction(iterator.next)) {
      return true
    }
  } catch (_) {}

  return false
}

export default isIterable
