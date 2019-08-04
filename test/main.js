import test from 'ava'
import tester from './helpers/tester'

import fastCartesianProduct from '../src/algorithms/recursive'

test('src', t => {
  tester(t, fastCartesianProduct)
})
