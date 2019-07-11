import isArrayLike from './is-array-like'
import each from './each'

function getIterableElement(iterable, index) {
  // prefer iterable
  if (isArrayLike(iterable)) {
    return iterable[index]
  }

  let element

  each(iterable, (value, currentIndex) => {
    if (index === currentIndex) {
      element = value
      return false
    }
  })

  return element
}

export default getIterableElement
