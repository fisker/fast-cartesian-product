import FastCartesionProduct from '../src'

const sets = [
  // string
  'AB',
  // array
  Array.from({length: 2}, (_, index) => `array element ${index}`),
  // set
  new Set(['set element 1', 'set element 2']),
  // arrayLike
  {
    length: 2,
    0: 'arrayLike element 1',
    1: 'arrayLike element 1',
  },
]

console.log([...new FastCartesionProduct(sets)])
console.log([...new FastCartesionProduct(new Set(sets))])
