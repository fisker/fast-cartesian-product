import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import rollupPrettier from 'rollup-plugin-prettier'
import {terser} from 'rollup-plugin-terser'
import prettier from 'prettier'

const prettierConfig = prettier.resolveConfig.sync('src/index.js')

const commonPlugins = [resolve(), cjs(), babel()]

const plugins = [
  ...commonPlugins,
  rollupPrettier({
    ...prettierConfig,
    sourcemap: true,
  }),
]

const minify = [...commonPlugins, terser()]

const moduleName = 'fastCartesianProduct'

const builds = {
  input: 'src/index.js',
  output: [
    // umd build
    {
      file: 'dist/index.js',
      format: 'umd',
      name: moduleName,
      sourcemap: true,
    },
    // esm build
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins,
}

const minifiedBuilds = {
  ...builds,
  output: builds.output.map(config => ({
    ...config,
    file: config.file.replace(/(\.m?js)$/, '.min$1'),
  })),
  plugins: minify,
}

export default [builds, minifiedBuilds]
