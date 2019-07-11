import SYMBOL_ITERATOR from './symbol-iterator'
import isArrayLike from './is-array-like'
import isFunction from './is-function'

function iterableEach(iterable, iteratee) {
  const iterator = iterable[SYMBOL_ITERATOR]()
  let index = -1
  let value
  let done
  while (true) {
    index += 1
    ;({value, done} = iterator.next())

    if (done) {
      break
    }

    const shouldContinue = iteratee(value, index, iterable)

    if (shouldContinue === false) {
      break
    }
  }
}

function forEach(iterable, iteratee) {
  const {length} = iterable
  for (let index = 0; index < length; index += 1) {
    const shouldContinue = iteratee(iterable[index], index, iterable)

    /* istanbul ignore if  */
    if (shouldContinue === false) {
      break
    }
  }
}

function each(iterable, iteratee) {
  // prefer iterable
  if (isFunction(iterable[SYMBOL_ITERATOR])) {
    return iterableEach(iterable, iteratee)
  }

  /* istanbul ignore else  */
  if (isArrayLike(iterable)) {
    return forEach(iterable, iteratee)
  }
}

export default each
