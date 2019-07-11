import isArrayLike from './is-array-like'
import isSet from './is-set'
import each from './each'

function getIterableSize(iterable) {
  if (isArrayLike(iterable)) {
    return iterable.length
  }

  if (isSet(iterable)) {
    return iterable.size
  }

  let size = 0

  each(iterable, () => (size += 1))

  return size
}

export default getIterableSize
