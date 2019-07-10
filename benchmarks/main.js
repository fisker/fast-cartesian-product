// FROM https://raw.githubusercontent.com/ehmicky/fast-cartesian/master/benchmarks
import 'regenerator-runtime'
import checkSpeed from 'check-speed'
import cartesianProduct from 'cartesian-product'
import cartesian from 'cartesian'
import {cartesianArray} from 'fast-cartesian'
import lodash from 'lodash'
// eslint-disable-next-line import/no-unassigned-import
import 'lodash.product'

import FastCartesianProduct from '../src'

import {variants} from './variants.js'

const testFastCartesianProduct = {
  title: 'fast-cartesian-product',
  main: (...arguments_) => [...new FastCartesianProduct(arguments_)],
  variants,
}

const testFastCartesian = {
  title: 'fast-cartesian',
  main: (...arguments_) => cartesianArray(...arguments_),
  variants,
}

const testCartesianProduct = {
  title: 'cartesian-product',
  main: (...arguments_) => cartesianProduct(arguments_),
  variants,
}

const testCartesian = {
  title: 'cartesian',
  main: (...arguments_) => cartesian(arguments_),
  variants,
}

const testLodashProduct = {
  title: 'lodash.product',
  main: (...arguments_) => lodash.product(...arguments_),
  variants,
}

checkSpeed(
  {
    testFastCartesianProduct,
    testFastCartesian,
    testCartesianProduct,
    testCartesian,
    testLodashProduct,
  },
  {repeat: 1e2}
)
