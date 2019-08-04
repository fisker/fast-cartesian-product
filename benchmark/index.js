// eslint-disable-next-line import/no-extraneous-dependencies
import Benchmark from 'benchmark'
import path from 'path'
import fs from 'fs'
import arrays from './sets'

const directory = path.join(__dirname, '../src/algorithms')
const files = fs.readdirSync(directory)

const algorithms = [
  ...files.map(file => {
    const name = path
      .basename(file, '.js')
      .replace(/-/g, ' ')
      .replace(/(^.)|\s./g, $0 => $0.toUpperCase())

    return {
      name,
      fn: require(path.join(directory, file)).default,
    }
  }),
]

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
