import fs from 'node:fs/promises'
import path from 'node:path'
import {pathToFileURL} from 'node:url'
import test from 'ava'
import createEsmUtils from 'esm-utils'
import tester from './_tester.js'

const {__dirname} = createEsmUtils(import.meta)

const directory = path.join(__dirname, '../src/algorithms')

for (const file of await fs.readdir(directory)) {
  test(file, async (t) => {
    const {default: module} = await import(
      pathToFileURL(path.join(directory, file))
    )
    tester(t, module)
  })
}
