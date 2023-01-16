import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'js/index.js',
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      preferBuiltins: false
    }),
    commonjs()
  ],
  watch: {
    clearScreen: true,
    include: [
      'js/**',
      'index.html'
    ]
  }
};