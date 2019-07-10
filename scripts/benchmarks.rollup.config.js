import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import {terser} from 'rollup-plugin-terser'

export default {
  input: 'benchmarks/main.js',
  output: [
    // esm build
    {
      file: '.cache/benchmarks.js',
      format: 'cjs',
    },
  ],
  plugins: [resolve(), cjs(), babel()],
}
