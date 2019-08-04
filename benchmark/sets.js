const array = [
  makeArray(128, 1),
  makeArray(128, 1),
  makeArray(4, 2),
  makeArray(8, 2),
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
