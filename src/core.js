import isFinite from './utils/is-finite'
import forEach from './utils/for-each'
import getIterableSize from './utils/get-iterable-size'
import getIterableElement from './utils/get-iterable-element-by-index'
import isIterable from './utils/is-iterable'

class FastCartesianProduct {
  constructor(sets) {
    if (!isIterable(sets)) {
      throw new TypeError('`sets` should be `Iterable`')
    }

    forEach(sets, elements => {
      if (!isIterable(elements)) {
        throw new TypeError('elements in `sets` should be `Iterable`')
      }

      if (getIterableSize(elements) <= 0) {
        throw new Error('`sets` should not have empty elements')
      }
    })

    this.sets = sets
  }

  get(index) {
    const setsSize = getIterableSize(this.sets)
    const combination = new Array(setsSize)

    let indexRemaining = index

    for (let setsIndex = 0; setsIndex < setsSize; setsIndex += 1) {
      const combinationIndex = setsSize - setsIndex - 1
      const elements = getIterableElement(this.sets, combinationIndex)
      const elementsSize = getIterableSize(elements)
      const elementsIndex = indexRemaining % elementsSize
      indexRemaining -= elementsIndex
      indexRemaining /= elementsSize
      combination[combinationIndex] = getIterableElement(
        elements,
        elementsIndex
      )
    }

    return combination
  }

  [Symbol.iterator]() {
    const instance = this
    const {size} = instance
    let index = 0

    return {
      next() {
        const done = index >= size
        const value = instance.get(index)

        index += 1

        return {
          value,
          done,
        }
      },
    }
  }

  get size() {
    let size = 1

    forEach(this.sets, elements => {
      const elementsSize = getIterableSize(elements)
      size *= elementsSize
      // eslint-disable-next-line no-restricted-globals
      if (!isFinite(size)) {
        return false
      }
    })

    return size
  }
}

export default FastCartesianProduct
