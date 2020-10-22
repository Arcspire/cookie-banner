import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'

export default [
    {
        input: 'src/cookie-banner.js',
        output: [
            {
                name: `cookieBanner`,
                file: `dist/cookie-banner.js`,
                format: 'umd',
            },
            {
                name: `cookieBanner`,
                file: `dist/cookie-banner.min.js`,
                format: 'umd',
                plugins: [terser()],
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            babel({ babelHelpers: 'external', exclude: 'node_modules/**' }),
            postcss({
                minimize: true,
            }),
        ],
    },
]
