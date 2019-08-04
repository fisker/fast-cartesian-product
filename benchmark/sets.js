const array = [
  makeArray(2 ** 8, 1),
  makeArray(1, 2 ** 8),
  makeArray(4, 8),
  makeArray(8, 4),
  makeArray(2, 16),
  makeArray(16, 2),
  makeArray(5),
]

function random(low, high) {
  return low + Math.floor(Math.random() * (high - low))
}

function makeArray(width, height = 'random') {
  if (height === 'random') {
    const sets = Array.from({length: width}, () =>
      Array.from({length: random(1, 8)}, fillArray)
    )
    const title = `sets with random length: [${sets
      .map(({length}) => length)
      .join(', ')}]`

    return {
      title,
      sets,
    }
  }

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
