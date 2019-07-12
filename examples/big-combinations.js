import FastCartesionProduct from '../src'

const MAX_ARRAY_LENGTH = 2 ** 32 - 1
const numbers = Array.from({length: 10}, (_, index) => index)
const sets = Array.from({length: 1024}).fill(numbers)

const combinations = new FastCartesionProduct(sets)

console.log('size of combinations:', combinations.size)
console.log(
  [
    ...Array.from(
      {length: 5},
      () =>
        MAX_ARRAY_LENGTH +
        Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - MAX_ARRAY_LENGTH))
    ),
    Number.MAX_VALUE,
  ].map(index => ({
    index: BigInt(index).toString(),
    value: combinations.get(index).join(''),
  }))
)
