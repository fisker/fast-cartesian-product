function product(sets) {
  const {length: setsSize} = sets
  const combinations = []

  let done = setsSize === 0
  let index = 0

  while (!done) {
    const combination = Array.from({length: setsSize})

    let indexRemaining = index
    done = true

    for (let setsIndex = 0; setsIndex < setsSize; setsIndex += 1) {
      const negativeIndex = setsSize - setsIndex - 1
      const elements = sets[negativeIndex]
      const {length: elementsSize} = elements

      if (elementsSize === 0) {
        throw new TypeError('`sets` should not has empty elements')
      }

      let elementsIndex = 0

      if (indexRemaining !== 0) {
        elementsIndex = indexRemaining % elementsSize
        indexRemaining = (indexRemaining - elementsIndex) / elementsSize
      }

      combination[negativeIndex] = elements[elementsIndex]

      if (done && elementsIndex !== elementsSize - 1) {
        done = false
      }
    }

    index = combinations.push(combination)
  }

  return combinations
}

export default product
