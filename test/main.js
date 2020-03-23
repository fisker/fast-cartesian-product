import test from 'ava'
import tester from './_tester'

import fastCartesianProduct from '../src/algorithms/recursive'

test('src', (t) => {
  tester(t, fastCartesianProduct)
})
