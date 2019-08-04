const cache = {}
const ARGUMENT_NAME = 'sets'
const RESULTS_NAME = 'results'
const SETS_PREFIX = 'sets'
const LENGTH_PREFIX = 'length'
const INDEX_PREFIX = 'index'

function makeProductFunction(setSize) {
  const elementsCache = new Array(setSize)
  const lengthCache = new Array(setSize)
  const loopLength = setSize * 2 + 1
  const loopBody = new Array(loopLength)
  const resultBody = new Array(setSize)
  let lengthCheck = new Array(setSize)
  for (let setIndex = 0; setIndex < setSize; setIndex += 1) {
    elementsCache[
      setIndex
    ] = `var ${SETS_PREFIX}${setIndex} = ${ARGUMENT_NAME}[${setIndex}]`
    lengthCache[
      setIndex
    ] = `var ${LENGTH_PREFIX}${setIndex} = ${SETS_PREFIX}${setIndex}.length`
    lengthCheck[setIndex] = `${LENGTH_PREFIX}${setIndex} === 0`
    resultBody[
      setIndex
    ] = `${SETS_PREFIX}${setIndex}[${INDEX_PREFIX}${setIndex}]`
    loopBody[
      setIndex
    ] = `for (var ${INDEX_PREFIX}${setIndex} = 0; ${INDEX_PREFIX}${setIndex} < ${LENGTH_PREFIX}${setIndex}; ${INDEX_PREFIX}${setIndex} += 1) {`
    loopBody[loopLength - setIndex] = `}`
  }
  loopBody[setSize + 1] = `${RESULTS_NAME}.push([${resultBody.join(',')}])`
  lengthCheck = `if(${lengthCheck.join(
    ' || '
  )}) {throw new TypeError('\`sets\` should not has empty elements')}`

  const functionBody = [
    `var ${RESULTS_NAME} = []`,
    elementsCache.join('\n'),
    lengthCache.join('\n'),
    lengthCheck,
    loopBody.join('\n'),
    `return ${RESULTS_NAME}`,
  ].join('\n')

  // eslint-disable-next-line no-new-func
  return new Function(ARGUMENT_NAME, functionBody)
}

function product(sets) {
  const {length: setsSize} = sets

  if (setsSize === 0) {
    return []
  }

  const function_ =
    cache[setsSize] || (cache[setsSize] = makeProductFunction(setsSize))

  return function_(sets)
}

export default product
