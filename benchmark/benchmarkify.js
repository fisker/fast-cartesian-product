// eslint-disable-next-line import/no-extraneous-dependencies
import Benchmarkify from 'benchmarkify'
import arrays from './sets'
import algorithms from './algorithms'

const benchmark = new Benchmarkify('Cartesian product algorithms')
const suites = arrays.map(({title, sets}) => {
  const bench = benchmark.createSuite(title)

  for (const {name, fn: function_} of algorithms) {
    bench.add(name, () => {
      function_(sets)
    })
  }

  return bench
})

benchmark.printHeader()
benchmark.run(suites)
