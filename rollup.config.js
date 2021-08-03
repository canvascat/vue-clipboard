import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { camelize } from '@vue/shared';
const pkg = require('./package.json');

function pascal(name) {
  if (!name.startsWith('-')) name = '-' + name
  return camelize(name)
}

export default {
  input: './src/index.ts',
  output: [
    { file: pkg.main, name: pascal(pkg.name), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  plugins: [
    typescript({ tsconfig: './src/tsconfig.json' }),
    commonjs({ extensions: ['.js', '.ts'] }), // the ".ts" extension is required
    nodeResolve()
  ]
};
