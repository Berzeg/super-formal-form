import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/form.js',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  external: ['react', 'prop-types', '@super-formal/chain-reaction']
};
