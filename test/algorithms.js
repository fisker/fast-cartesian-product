import fs from 'fs'
import path from 'path'
import test from 'ava'
import tester from './helpers/tester'

const directory = path.join(__dirname, '../src/algorithms')

for (const file of fs.readdirSync(directory)) {
  test(file, t => {
    const module_ = require(path.join(directory, file)).default
    tester(t, module_)
  })
}
