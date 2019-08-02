function fastCartesianProduct(sets) {
  const {length: setsSize} = sets
  let done = setsSize === 0
  const combinations = []
  let index = 0
  while (!done) {
    const combination = new Array(setsSize)

    let indexRemaining = index
    done = true

    for (let setsIndex = 0; setsIndex < setsSize; setsIndex += 1) {
      const combinationIndex = setsSize - setsIndex - 1
      const elements = sets[combinationIndex]
      const {length: elementsSize} = elements

      if (elementsSize === 0) {
        throw new TypeError('`sets` should not has empty elements')
      }

      const elementsIndex = indexRemaining % elementsSize
      indexRemaining -= elementsIndex
      indexRemaining /= elementsSize
      combination[combinationIndex] = elements[elementsIndex]

      if (done && elementsIndex !== elementsSize - 1) {
        done = false
      }
    }

    index = combinations.push(combination)
  }

  return combinations
}

export default fastCartesianProduct
