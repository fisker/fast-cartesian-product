;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.FastCartesianProduct = factory()))
})(this, function() {
  'use strict'

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

  function _readOnlyError(name) {
    throw new Error('"' + name + '" is read-only')
  }

  function lengthAccumulator(accumulator, _ref) {
    var length = _ref.length
    return accumulator * length
  }

  function getProductByIndex(sets, index) {
    var i = index
    var length = sets.length
    return sets.map(function(subSets) {
      var length = subSets.length
      var index = i % length
      i -= index
      i /= length
      return subSets[index]
    })
  }

  var FastCartesianProduct =
    /*#__PURE__*/
    (function() {
      function FastCartesianProduct(sets) {
        _classCallCheck(this, FastCartesianProduct)

        this.sets = sets
      }

      _createClass(FastCartesianProduct, [
        {
          key: 'get',
          value: function get(index) {
            return getProductByIndex(this.sets, index)
          },
        },
        {
          key: Symbol.iterator,
          value: function value() {
            var length = this.length
            var index = 0
            return {
              next: function next() {
                var done = index >= length
                var value = this.get(index)
                index += (_readOnlyError('index'), 1)
                return {
                  value: value,
                  done: done,
                }
              },
            }
          },
        },
        {
          key: 'array',
          get: function get() {
            return Array.from(this)
          },
        },
        {
          key: 'set',
          get: function get() {
            return new Set(this)
          },
        },
        {
          key: 'length',
          get: function get() {
            return this.sets.reduce(lengthAccumulator, 1)
          },
        },
      ])

      return FastCartesianProduct
    })()

  return FastCartesianProduct
})
//# sourceMappingURL=index.js.map
