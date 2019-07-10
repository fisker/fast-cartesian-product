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

  t.is(products.size, Infinity)
  t.is(products.get(MAX_ARRAY_LENGTH + MAX_ARRAY_LENGTH).join(''), '0'.repeat(1024 - 10) + '8589934590')
  t.is(products.get(Number.MAX_SAFE_INTEGER).join(''), '0'.repeat(1024 - 16) + '9007199254740991')
  t.is(products.get(Number.MAX_VALUE).join(''), '0'.repeat(1024 - 309) + '179769313486231680088648464220646842686668242844028646442228680066046004606080400844208228060084840044686866242482868202680268820402884062800406622428864666882406066422426822086680426404402040202424880224808280820888844286620802664406086660842040886824002682662666864246642840408646468824200860804260804068888')
})
