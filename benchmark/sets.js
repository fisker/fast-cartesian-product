const array = [
  makeArray(2 ** 8, 1),
  makeArray(1, 2 ** 8),
  makeArray(4, 8),
  makeArray(8, 8),
  makeArray(2, 16),
  makeArray(16, 2),
  makeArray(random(2, 8), random(2, 8)),
  makeArray(random(2, 8), random(2, 8)),
  makeArray(random(2, 8), random(2, 8)),
  makeArray(random(2, 8), random(2, 8)),
]

function random(low, high) {
  return low + Math.floor(Math.random(high - low))
}

function makeArray(width, height) {
  return {
    title: `sets: ${width}x${height}`,
    sets: Array.from({length: width}, () =>
      Array.from({length: height}, fillArray)
    ),
  }
}

function fillArray(_, index) {
  return index
}

export default array
