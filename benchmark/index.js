import Benchmark from 'benchmark'
import arrays from './sets.js'
import algorithms from './algorithms.js'

function alignAlgorithmNames(name) {
  const maxLength = Math.max(...algorithms.map(({name: {length}}) => length))
  return `[ ${name.padEnd(maxLength)} ]`
}

const benchmarkOptions = {minSamples: 100}

for (const {title, sets} of arrays) {
  console.log()
  console.log(title)
  console.log()
  algorithms
    .reduce(
      (suite, {name, fn: function_}) =>
        suite.add(
          alignAlgorithmNames(name),
          () => function_(sets),
          benchmarkOptions,
        ),
      new Benchmark.Suite(),
    )
    .on('cycle', ({target}) => {
      console.log(`- ${String(target)}`)
    })
    .on('complete', function () {
      console.log()
      console.log(`> Fastest is ${this.filter('fastest').map('name')}`)
      console.log()
    })
    .run()
}
