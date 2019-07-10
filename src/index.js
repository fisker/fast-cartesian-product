function lengthAccumulator(accumulator, {length}) {
  return accumulator * length
}

const hasOwn = Object.prototype.hasOwnProperty

function isValidSet(iterable) {
  return getIterableLength(iterable) > 0
}

function hasLength(iterable) {
  return hasOwn.call(iterable, 'length')
}

function breakableForEach(iterable, iteratee) {
  if (hasLength(iterable)) {
    const {length} = iterable
    for (let i = 0; i < length; i += 1) {
      const shouldContinue = iteratee(iterable[i], i, iterable)

      if (shouldContinue === false) {
        break
      }
    }

    return
  }

  const iterator = iterable[Symbol.iterator]()

  let index = 0
  let {value, done} = iterator.next()
  while (!done) {
    const shouldContinue = iteratee(value, index, iterable)

    if (shouldContinue === false) {
      break
    }

    ;({value, done} = iterator.next())
    index += 1
  }
}

function getIterableElementByIndex(iterable, index) {
  if (hasLength(iterable)) {
    return iterable[index]
  }

  let element

  breakableForEach(iterable, (value, currentIndex) => {
    if (index === currentIndex) {
      element = value
      return false
    }
  })

  return element
}

function getIterableLength(iterable) {
  if (hasLength(iterable)) {
    return iterable.length
  }

  // Set#size
  if ('size' in iterable) {
    return iterable.size
  }

  let length = 0

  breakableForEach(iterable, () => (length += 1))

  return length
}

class FastCartesianProduct {
  constructor(sets) {
    if (!isValidSet(sets)) {
      throw new Error('sets should not be empty')
    }

    breakableForEach(sets, subsets => {
      if (!isValidSet(subsets)) {
        throw new Error('sets should not have empty element')
      }
    })

    this.sets = sets
  }

  get(index) {
    const setsLength = getIterableLength(this.sets)
    const set = new Array(setsLength)

    let indexRemaining = index

    for (let i = 0; i < setsLength; i += 1) {
      const subSets = getIterableElementByIndex(this.sets, setsLength - i - 1)
      const length = getIterableLength(subSets)
      const index = indexRemaining % length
      indexRemaining -= index
      indexRemaining /= length
      set[setsLength - i - 1] = getIterableElementByIndex(subSets, index)
    }

    return set
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
    const setsLength = getIterableLength(this.sets)

    breakableForEach(this.sets, subSets => {
      const length = getIterableLength(subSets)
      size *= length
      // eslint-disable-next-line no-restricted-globals
      if (!isFinite(size)) {
        return false
      }
    })

    return size
  }
}

export default FastCartesianProduct
