import path from 'node:path'
import test from 'ava'
import copyFile from 'cp-file'
import del from 'del'
import createEsmUtils from 'esm-utils'
import {pathToFileURL} from 'node:url'
import tempy from 'tempy'
import buildConfig from '../rollup.config.js'
import tester from './_tester.js'

const {__dirname, require} = createEsmUtils(import.meta)

const builds = buildConfig
  .flatMap(({output}) => output)
  .map((build) => ({
    ...build,
    basename: path.basename(build.file),
    file: path.join(__dirname, '..', build.file),
  }))

for (const {file, basename, format} of builds) {
  if (format === 'umd') {
    const temporaryFile = tempy.file({extension: 'js'})
    // eslint-disable-next-line no-await-in-loop
    await copyFile(file, temporaryFile)
    const module = require(temporaryFile)
    // eslint-disable-next-line no-await-in-loop
    await del(temporaryFile, {glob: false, force: true})
    test(basename, (t) => {
      tester(t, module)
    })
  } else {
    test(basename, async (t) => {
      const {default: module_} = await import(pathToFileURL(file))
      tester(t, module_)
    })
  }
}
