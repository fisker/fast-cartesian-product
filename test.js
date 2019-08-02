import test from 'ava'
import fastCartesianProduct from './src'

test('main', t => {
  t.deepEqual(fastCartesianProduct([[0, 1], ['A', 'B']]), [
    [0, 'A'],
    [0, 'B'],
    [1, 'A'],
    [1, 'B'],
  ])
})

test('empty array', t => {
  t.deepEqual(fastCartesianProduct([]), [])
  t.throws(
    () => {
      fastCartesianProduct([[]])
    },
    Error,
    '`sets` should not has empty elements'
  )
})
