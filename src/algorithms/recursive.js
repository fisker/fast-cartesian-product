function product(sets) {
  const {length: setsSize} = sets

  if (setsSize === 0) {
    return []
  }

  const combinations = []
  const combination = Array.from({length: setsSize})

  return (function setElement(setsIndex) {
    const elements = sets[setsIndex]
    const {length: elementsSize} = elements

    if (elementsSize === 0) {
      throw new TypeError('`sets` should not has empty elements')
    }

    const isLastSets = setsIndex === setsSize - 1

    for (
      let elementsIndex = 0;
      elementsIndex < elementsSize;
      elementsIndex += 1
    ) {
      const value = elements[elementsIndex]
      combination[setsIndex] = value

      if (isLastSets) {
        // TODO: check is last one
        // combinations.push(done ? combination : combination.slice())
        combinations.push([...combination])
      } else {
        setElement(setsIndex + 1)
      }
    }

    return combinations
  })(0)
}

export default product
