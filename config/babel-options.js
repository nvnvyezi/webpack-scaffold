const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      modules: false,
      corejs: 3,
    },
  ],
  ['@babel/preset-react'],
  ['@babel/preset-typescript'],
]

const plugins = [
  ['@babel/plugin-transform-runtime'],
  [
    'styled-jsx/babel',
    {
      sourceMaps: process.env.NODE_ENV === 'development',
    },
  ],
]

module.exports = {
  presets,
  plugins,
  babelrc: false,
}
