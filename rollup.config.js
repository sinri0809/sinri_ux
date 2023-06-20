import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
// import prettier from 'rollup-plugin-prettier';
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';
import postcssurl from 'postcss-url';

import path from 'path';

const extensions = ['.js', '.ts'];

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: 'src/external.ts',
    output: [
      { file: 'dist/index.esm.js', format: 'esm', sourceMap: true },
      { file: 'dist/index.cjs.js', format: 'cjs', sourceMap: true },
    ],
    resolve: [
     
    ],
    plugins: [
      alias({
        entries: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
          { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
          { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        ],
      }),
      commonjs(),
      postcss({
        extensions: ['.css', '.scss', '.less'],
        use: [
          'sass',
          [
            'less',
            {
              javascriptEnabled: true,
            },
          ],
        ],
        plugins: [
          postcssurl({
            url: 'inline',
          }),
        ],
      }),
      typescript({
        clean: true,
        sourceMap: false,
      }),
      resolve({ extensions, preferBuiltins: false, browser: true }),
      url(),
      uglify(), // 번들링 크기 최소화+난독화
    ],

    external: ['react', 'react-dom'],
  },
  {
    input: 'src/external.ts',
    output: [{ file: 'dist/index.d.ts', format: 'cjs' }],

    plugins: [
      dts(),
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
      }),
      // 타입 정의 파일 가독성 - prettier
      // prettier({
      //   tabWidth: 2,
      // }),
    ],
  },
];
