import path from 'node:path'
import fs from 'node:fs/promises'

const directory = new URL('../src/algorithms/', import.meta.url)
const files = await fs.readdir(directory)

const algorithms = await Promise.all(
  files.map(async (file) => {
    const name = path
      .basename(file, '.js')
      .replace(/-/g, ' ')
      .replace(/(^.)|\s./g, ($0) => $0.toUpperCase())
    const {default: function_} = await import(new URL(file, directory))

    return {
      name,
      fn: function_,
    }
  }),
)

export default algorithms
