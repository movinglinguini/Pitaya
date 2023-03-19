import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

export default {
  input: 'src/index.js',
  output: {
    dir: 'build',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    nodeResolve({
      preferBuiltins: false
    }),
    injectProcessEnv({
      NODE_ENV: 'development',
    })
  ],
  watch: {
    clearScreen: false,
    include: [
      'src/**',
      'instructions/**',
      'css/**',
      'index.html',
      'pitaya.config.json',
    ]
  }
};