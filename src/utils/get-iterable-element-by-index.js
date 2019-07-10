import hasLength from './has-length'
import forEach from './for-each'

function getIterableElementByIndex(iterable, index) {
  if (hasLength(iterable)) {
    return iterable[index]
  }

  let element

  forEach(iterable, (value, currentIndex) => {
    if (index === currentIndex) {
      element = value
      return false
    }
  })

  return element
}

export default getIterableElementByIndex
