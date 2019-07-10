// FROM https://raw.githubusercontent.com/ehmicky/fast-cartesian/master/benchmarks

// Retrieve several arguments for cartesian products:
//  - the return value length is always the same
//  - the number of dimensions and size of each array differ
// For example `length: 3` returns:
// /  [[0, 1, 2, 3]] (1 dimension)
//   [[0, 1], [0, 1]] (2 dimensions)
//   [[0], [0], [0], [0]] (4 dimensions)
const getVariants = function(length) {
  const variantsA = Array.from({length}, (value, index) =>
    getVariant(index, length)
  )
  return Object.fromEntries(variantsA)
}

const getVariant = function(index, length) {
  const dimensions = 2 ** index
  const unitLength = 2 ** (2 ** (length - index - 1))
  const unit = Array.from({length: unitLength}, getIndex)
  const arguments_ = Array.from({length: dimensions}, () => unit)
  const title =
    dimensions === 1 ? `${dimensions} array` : `${dimensions} arrays`
  return [title, arguments_]
}

const getIndex = function(value, index) {
  return index
}

export const variants = getVariants(5)
