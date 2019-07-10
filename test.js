import test from 'ava'
import FastCartesianProduct from './src'

test('main', t => {
  const sets = new FastCartesianProduct([[1, 2], [1, 2]])
  const result = [[1,1],[1,2],[2,1],[2,2]]

  t.deepEqual(
    Array.from(sets),
    result
  )

  t.deepEqual(
    new Set(sets),
    new Set(result)
  )

  let i = 0
  for (const set of sets) {
    t.deepEqual(set, result[i++])
  }
})

test.skip('supports sets', t => {
  const sets = new FastCartesianProduct(new Set([new Set(1,2), new Set(1,2)]))
  const result = [
    new Set(1,1),
    new Set(1,2),
    new Set(2,1),
    new Set(2,2)
  ]

  t.deepEqual(
    Array.from(sets),
    result
  )

})

test('infinity products', t => {
  const set = Array.from({length: 10}, (_, i) => i)
  const products = new FastCartesianProduct(Array.from({length: 1024}, () => set))
  const testsIndex = Array.from({length: 10}, () => Math.floor(Math.random() * 2 ** 32 -1))

  t.is(products.size, Infinity)
  testsIndex.forEach(index => {
    t.is(
      products.get(index).join(''),
      '0'.repeat(1024 - String(index).length) + String(index)
    )
  })
})
