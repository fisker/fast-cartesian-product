// eslint-disable-next-line import/no-extraneous-dependencies
import Benchmark from 'benchmark'
import arrays from './sets'
import algorithms from './algorithms'

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
      (suite, {name, fn}) =>
        suite.add(alignAlgorithmNames(name), () => fn(sets), benchmarkOptions),
      new Benchmark.Suite()
    )
    .on('cycle', ({target}) => {
      console.log(`- ${String(target)}`)
    })
    .on('complete', function() {
      console.log()
      console.log(`> Fastest is ${this.filter('fastest').map('name')}`)
      console.log()
    })
    .run()
}
