import test from 'ava'
import fastCartesianProduct from '../src/algorithms/recursive.js'
import tester from './_tester.js'

test('src', (t) => {
  tester(t, fastCartesianProduct)
})
