// eslint-disable-next-line import/no-extraneous-dependencies
import Benchmark from 'benchmark'
import path from 'path'
import fs from 'fs'
import arrays from './sets'

const directory = path.join(__dirname, '../src/algorithms')
const files = fs.readdirSync(directory)
const maxAlgorithmNamesLength = Math.max(...files.map(({length}) => length)) - 3
const algorithmNames = files.map(file => {
  const basename = path.basename(file, '.js')
  const name = basename
    .replace(/-/g, ' ')
    .replace(/(^.)|\s./g, $0 => $0.toUpperCase())
  return `[ ${name.padEnd(maxAlgorithmNamesLength)} ]`
})
const algorithms = files
  .map(file => path.join(directory, file))
  .map(file => require(file).default)
const options = {minSamples: 100}

for (const {title, sets} of arrays) {
  console.log()
  console.log(title)
  console.log()
  algorithms
    .reduce(
      (suite, algorithm, index) =>
        suite.add(algorithmNames[index], () => algorithm(sets), options),
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
