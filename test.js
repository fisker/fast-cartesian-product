import test from 'ava'
import FastCartesianProduct from './src'

const product = sets => new FastCartesianProduct(sets)

test('main', t => {
  const combinations = product([[0, 1], ['A', 'B']])
  const result = [[0, 'A'], [0, 'B'], [1, 'A'], [1, 'B']]

  t.deepEqual(Array.from(combinations).join(), result.join())

  t.deepEqual(new Set(combinations), new Set(result))

  let i = 0
  for (const combination of combinations) {
    t.deepEqual(combination, result[i])
    i += 1
  }
})

test('empty check', t => {
  t.throws(
    () => {
      product(() => {})
    },
    TypeError,
    '`sets` should be `Iterable`'
  )
  t.throws(
    () => {
      product([() => {}])
    },
    TypeError,
    'elements in `sets` should be `Iterable`'
  )
  t.throws(
    () => {
      product([[]])
    },
    Error,
    '`sets` should not have empty elements'
  )
})

test('supports `Set`', t => {
  const combinations = product(new Set([new Set([0, 1]), new Set([0, 1])]))
  const result = [[0, 0], [0, 1], [1, 0], [1, 1]]
  t.deepEqual(
    Array.from(combinations).map(combination => Array.from(combination)),
    result
  )
})

test('supports `ArrayLike`', t => {
  ;(function() {
    // eslint-disable-next-line prefer-rest-params
    const combinations = product(arguments)
    const result = [[0, 0], [0, 1], [1, 0], [1, 1]]
    t.deepEqual(Array.from(combinations), result)
  })([0, 1], [0, 1])
})

test('infinity products', t => {
  const element = Array.from({length: 10}, (_, i) => i)
  const combinations = product(Array.from({length: 1024}, () => element))

  // yes, we can access index over max Array length
  const MAX_ARRAY_LENGTH = 2 ** 32 - 1

  t.is(combinations.size, Infinity)
  t.is(
    combinations.get(MAX_ARRAY_LENGTH + MAX_ARRAY_LENGTH).join(''),
    `${'0'.repeat(1024 - 10)}8589934590`
  )
  t.is(
    combinations.get(Number.MAX_SAFE_INTEGER).join(''),
    `${'0'.repeat(1024 - 16)}9007199254740991`
  )
  t.is(
    combinations.get(Number.MAX_VALUE).join(''),
    `${'0'.repeat(
      1024 - 309
    )}179769313486231680088648464220646842686668242844028646442228680066046004606080400844208228060084840044686866242482868202680268820402884062800406622428864666882406066422426822086680426404402040202424880224808280820888844286620802664406086660842040886824002682662666864246642840408646468824200860804260804068888`
  )
})
