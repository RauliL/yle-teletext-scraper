import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './index.js',
    output: {
      file: './dist/index.js',
      format: 'cjs'
    },
    external: [
      'cross-fetch',
      'entities',
      'lodash.get',
      'strip'
    ],
    plugins: [
      babel({ babelHelpers: 'bundled' })
    ]
  },
  {
    input: './index.js',
    output: {
      file: './dist/index.mjs',
      format: 'es',
    },
    external: [
      'cross-fetch',
      'entities',
      'lodash.get',
      'strip'
    ],
    plugins: [
      babel({ babelHelpers: 'bundled' })
    ]
  },
  {
    input: './index.js',
    output: {
      file: './dist/index.iife.js',
      format: 'iife',
      name: 'YleTeletextScraper'
    },
    plugins: [
      commonjs(),
      nodeResolve({ browser: true }),
      babel({ babelHelpers: 'bundled' }),
      terser()
    ]
  }
];
