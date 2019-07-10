function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

var hasOwn = Object.prototype.hasOwnProperty

function isValidSet(iterable) {
  return getIterableLength(iterable) > 0
}

function hasLength(iterable) {
  return hasOwn.call(iterable, 'length')
}

function breakableForEach(iterable, iteratee) {
  if (hasLength(iterable)) {
    var length = iterable.length

    for (var i = 0; i < length; i += 1) {
      var shouldContinue = iteratee(iterable[i], i, iterable)

      if (shouldContinue === false) {
        break
      }
    }

    return
  }

  var iterator = iterable[Symbol.iterator]()
  var index = 0

  var _iterator$next = iterator.next(),
    value = _iterator$next.value,
    done = _iterator$next.done

  while (!done) {
    var _shouldContinue = iteratee(value, index, iterable)

    if (_shouldContinue === false) {
      break
    }

    var _iterator$next2 = iterator.next()

    value = _iterator$next2.value
    done = _iterator$next2.done
    index += 1
  }
}

function getIterableElementByIndex(iterable, index) {
  if (hasLength(iterable)) {
    return iterable[index]
  }

  var element
  breakableForEach(iterable, function(value, currentIndex) {
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
  } // Set#size

  if ('size' in iterable) {
    return iterable.size
  }

  var length = 0
  breakableForEach(iterable, function() {
    return (length += 1)
  })
  return length
}

var FastCartesianProduct =
  /*#__PURE__*/
  (function() {
    function FastCartesianProduct(sets) {
      _classCallCheck(this, FastCartesianProduct)

      if (!isValidSet(sets)) {
        throw new Error('sets should not be empty')
      }

      breakableForEach(sets, function(subsets) {
        if (!isValidSet(subsets)) {
          throw new Error('sets should not have empty element')
        }
      })
      this.sets = sets
    }

    _createClass(FastCartesianProduct, [
      {
        key: 'get',
        value: function get(index) {
          var setsLength = getIterableLength(this.sets)
          var set = new Array(setsLength)
          var indexRemaining = index

          for (var i = 0; i < setsLength; i += 1) {
            var subSets = getIterableElementByIndex(
              this.sets,
              setsLength - i - 1
            )
            var length = getIterableLength(subSets)

            var _index = indexRemaining % length

            indexRemaining -= _index
            indexRemaining /= length
            set[setsLength - i - 1] = getIterableElementByIndex(subSets, _index)
          }

          return set
        },
      },
      {
        key: Symbol.iterator,
        value: function value() {
          var instance = this
          var size = instance.size
          var index = 0
          return {
            next: function next() {
              var done = index >= size
              var value = instance.get(index)
              index += 1
              return {
                value: value,
                done: done,
              }
            },
          }
        },
      },
      {
        key: 'size',
        get: function get() {
          var size = 1
          var setsLength = getIterableLength(this.sets)
          breakableForEach(this.sets, function(subSets) {
            var length = getIterableLength(subSets)
            size *= length // eslint-disable-next-line no-restricted-globals

            if (!isFinite(size)) {
              return false
            }
          })
          return size
        },
      },
    ])

    return FastCartesianProduct
  })()

export default FastCartesianProduct
//# sourceMappingURL=index.mjs.map
