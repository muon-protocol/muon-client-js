import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-node-polyfills'

const path = require('path')

const input = [path.resolve(__dirname, 'src/index.js')]
const dist = 'dist'
const bundle = 'bundle'

const production = process.env.ROLLUP_WATCH

const serverConfig = {
  input,
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs',
      exports: 'auto'
    }
  ],
  plugins: [
    commonjs({
      include: ['node_modules/**', 'src/**']
    }),
    nodePolyfills(),

    resolve(),
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env'
          // {
          //   // modules: false,
          //   useBuiltIns: 'usage',
          //   corejs: '3'
          // }
        ]
      ],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    production && terser()
  ]
}

const clientConfig = {
  input,
  output: [
    {
      file: `${dist}/${bundle}.esm.js`,
      format: 'esm'
    },
    {
      name: 'muon',
      file: `${dist}/${bundle}.umd.js`,
      format: 'umd'
    }
  ],
  plugins: [
    commonjs({
      include: ['node_modules/**', 'src/**'],
      transformMixedEsModules: true
    }),
    nodePolyfills(),
    resolve(),
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env'
          // {
          //   // modules: false,
          //   useBuiltIns: 'usage',
          //   corejs: '3'
          // }
        ]
      ],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    production && terser()
  ]
}

module.exports = [serverConfig, clientConfig]
