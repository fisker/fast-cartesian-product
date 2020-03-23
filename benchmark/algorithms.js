import path from 'path'
import fs from 'fs'

const directory = path.join(__dirname, '../src/algorithms')
const files = fs.readdirSync(directory)

const algorithms = [
  ...files.map((file) => {
    const name = path
      .basename(file, '.js')
      .replace(/-/g, ' ')
      .replace(/(^.)|\s./g, ($0) => $0.toUpperCase())

    return {
      name,
      fn: require(path.join(directory, file)).default,
    }
  }),
]

export default algorithms
