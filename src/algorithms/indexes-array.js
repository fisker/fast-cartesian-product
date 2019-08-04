function product(sets) {
  const {length: setsSize} = sets
  const combinations = []

  let done = setsSize === 0
  const indexes = new Array(setsSize)
  while (!done) {
    const combination = indexes.slice()

    done = true

    for (let setsIndex = 0; setsIndex < setsSize; setsIndex += 1) {
      const elements = sets[setsIndex]
      const {length: elementsSize} = elements

      if (elementsSize === 0) {
        throw new TypeError('`sets` should not has empty elements')
      }

      const elementsIndex = combination[setsIndex] || 0

      combination[setsIndex] = elements[elementsIndex]

      if (done) {
        const negativeIndex = setsSize - setsIndex - 1
        const elementsIndex = indexes[negativeIndex] || 0

        if (elementsIndex !== sets[negativeIndex].length - 1) {
          indexes[negativeIndex] = elementsIndex + 1
          done = false
        } else {
          indexes[negativeIndex] = 0
        }
      }
    }

    combinations.push(combination)
  }

  return combinations
}

export default product
