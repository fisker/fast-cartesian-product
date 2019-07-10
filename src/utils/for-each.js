import hasLength from './has-length'

function forEach(iterable, iteratee) {
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

export default forEach
