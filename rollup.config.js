import babel from 'rollup-plugin-babel';

export default {
    input: './index.esm.js',
    output: {
        file: 'index.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            configFile: './babel.config.cjs',
            exclude: 'node_modules/**'
        })
    ]
}
