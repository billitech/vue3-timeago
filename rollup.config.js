import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
      nodeResolve()
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
      nodeResolve()
    ]
  }
] 