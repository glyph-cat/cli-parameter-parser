import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { RollupOptions } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
// import { version } from '../package.json'

const config: Array<RollupOptions> = [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/cjs/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
    },
    plugins: [
      nodeResolve({
        extensions: ['.ts', '.js'],
        preferBuiltins: true,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationDir: null,
            module: 'ESNext',
            outDir: null,
          },
          exclude: [
            './src/**/*.test*',
          ],
        },
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        values: {
          // 'process.env.NODE_ENV': JSON.stringify('production'),
          // 'process.env.VERSION': JSON.stringify(version),
          // 'process.env.BUILD_HASH': JSON.stringify(getRandomHash(6)),
        },
      }),
      terser(),
    ],
  },
]

export default config
