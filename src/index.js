function fastCartesianProduct(sets) {
  const {length: setsSize} = sets
  let done = setsSize === 0
  const combinations = []
  let index = 0
  while (!done) {
    const combination = new Array(setsSize)

    let indexRemaining = index
    done = true

    for (let setsIndex = setsSize - 1; setsIndex >= 0; setsIndex -= 1) {
      const elements = sets[setsIndex]
      const {length: elementsSize} = elements

      if (elementsSize === 0) {
        throw new TypeError('`sets` should not has empty elements')
      }

      let elementsIndex = 0

      if (indexRemaining !== 0) {
        elementsIndex = indexRemaining % elementsSize
        indexRemaining = (indexRemaining - elementsIndex) / elementsSize
      }

      combination[setsIndex] = elements[elementsIndex]

      if (done && elementsIndex !== elementsSize - 1) {
        done = false
      }
    }

    index = combinations.push(combination)
  }

  return combinations
}

export default fastCartesianProduct
