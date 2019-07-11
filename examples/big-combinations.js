import FastCartesionProduct from '../src'

const MAX_ARRAY_LENGTH = 2 ** 32 - 1
const numbers = Array.from({length: 10}, (_, index) => index)
const sets = Array.from({length: 1024}).fill(numbers)

const combinations = new FastCartesionProduct(sets)

for (let i = 0; i < 5; i += 1) {
  const index =
    MAX_ARRAY_LENGTH + Math.random() * (Number.MAX_VALUE - MAX_ARRAY_LENGTH)
  console.log(`${index} element of combinations is: `)
  console.log(combinations.get(index).join(''))
  console.log()
}

console.log('size of combinations:', combinations.size)
