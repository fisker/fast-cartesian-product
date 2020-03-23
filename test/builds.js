import path from 'path'
import test from 'ava'
import copyFile from 'cp-file'
import del from 'del'
import buildConfig from '../rollup.config'
import tester from './_tester'

// eslint-disable-next-line unicorn/prefer-flat-map
const builds = []
  .concat(...buildConfig.map(({output}) => output))
  .map((build) => ({
    ...build,
    basename: path.basename(build.file),
    file: path.join(__dirname, '..', build.file),
  }))

for (const {file, basename, format} of builds) {
  if (format === 'esm') {
    test(basename, async (t) => {
      // https://github.com/standard-things/esm/issues/498
      const temporaryFile = `${file}.esm.js`
      await copyFile(file, temporaryFile)
      const {default: module_} = await import(temporaryFile)
      del.sync(temporaryFile, {glob: false})
      tester(t, module_)
    })
  } else {
    test(basename, (t) => {
      tester(t, require(file))
    })
  }
}
