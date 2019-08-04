import path from 'path'
import test from 'ava'
import buildConfig from '../rollup.config'
import tester from './helpers/tester'

// eslint-disable-next-line unicorn/prefer-flat-map
const builds = []
  .concat(...buildConfig.map(({output}) => output))
  .map(build => ({
    ...build,
    basename: path.basename(build.file),
    file: path.join(__dirname, '..', build.file),
  }))

for (const {file, basename, format} of builds) {
  if (format === 'esm') {
    test(basename, async t => {
      const {default: module_} = await import(file)
      tester(t, module_)
    })
  } else {
    test(basename, t => {
      tester(t, require(file))
    })
  }
}
