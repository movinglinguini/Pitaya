import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
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
      'src/**',
      'css/**',
      'index.html',
      'pitaya.config.json',
    ]
  }
};