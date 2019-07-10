import test from 'ava'
import FastCartesianProduct from './src'

test('main', t => {
  const sets = new FastCartesianProduct([[1, 2], [1, 2]])
  const result = [[1, 1], [1, 2], [2, 1], [2, 2]]

  t.deepEqual(Array.from(sets), result)

  t.deepEqual(new Set(sets), new Set(result))

  let i = 0
  for (const set of sets) {
    t.deepEqual(set, result[i])
    i += 1
  }
})

test('empty check', t => {
  t.throws(() => {
    new FastCartesianProduct([])
  }, 'sets should not be empty')
  t.throws(() => {
    new FastCartesianProduct([[]])
  }, 'sets should not have empty element')
})

test('supports sets', t => {
  const sets = new FastCartesianProduct(
    new Set([new Set([1, 2]), new Set([1, 2])])
  )
  const result = [[1, 1], [1, 2], [2, 1], [2, 2]]
  t.deepEqual(Array.from(sets).map(subSet => Array.from(subSet)), result)
})

test('infinity products', t => {
  const set = Array.from({length: 10}, (_, i) => i)
  const products = new FastCartesianProduct(
    Array.from({length: 1024}, () => set)
  )

  // yes, we can access index over max Array length
  const MAX_ARRAY_LENGTH = 2 ** 32 - 1
  const testIndexes = Array.from(
    {length: 10},
    () => MAX_ARRAY_LENGTH + Math.floor(Math.random() * MAX_ARRAY_LENGTH)
  )

  t.is(products.size, Infinity)
  testIndexes.forEach(index => {
    t.is(
      products.get(index).join(''),
      '0'.repeat(1024 - String(index).length) + String(index)
    )
  })
})
