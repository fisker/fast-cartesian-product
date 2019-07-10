import hasLength from './has-length'
import forEach from './for-each'

function getIterableSize(iterable) {
  if (hasLength(iterable)) {
    return iterable.length
  }

  // Set#size
  if ('size' in iterable) {
    return iterable.size
  }

  let size = 0

  forEach(iterable, (_, index) => (size += 1))

  return size
}

export default getIterableSize
