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
            var setsArray = this.sets
            var setsLength = setsArray.length
            var set = new Array(setsLength)
            var indexRemaining = index

            for (var i = setsLength - 1; i >= 0; i -= 1) {
              var subSets = this.sets[i]
              var length = subSets.length

              var _index = indexRemaining % length

              indexRemaining -= _index
              indexRemaining /= length
              set[i] = subSets[_index]
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
            var setsLength = this.sets.length

            for (var i = 0; i < setsLength; i += 1) {
              var subSets = this.sets[i]
              var length = subSets.length
              size = size * length

              if (!isFinite(size)) {
                break
              }
            }

            return size
          },
        },
      ])

      return FastCartesianProduct
    })()

  return FastCartesianProduct
})
//# sourceMappingURL=index.js.map
