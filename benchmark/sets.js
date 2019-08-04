const array = [
  makeArray(2 ** 16, 1),
  makeArray(1, 2 ** 16),
  makeArray(2, 16),
  makeArray(4, 8),
  makeArray(8, 4),
  makeArray(16, 2),
]

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
