import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'src/TimeAgo.vue',
    output: {
      format: 'esm',
      file: 'dist/vue3-timeago.esm.js'
    },
    plugins: [
      terser(),
      commonjs(),
      vue(),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [["@babel/preset-env", { modules: false }]],
      })
    ]
  },
  {
    input: 'src/vue3-timeago.js',
    output: {
      format: 'iife',
      file: 'dist/vue3-timeago.js'
    },
    plugins: [
      terser(),
      commonjs(),
      vue(),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [["@babel/preset-env", { modules: false }]],
      })
    ]
  }
] 