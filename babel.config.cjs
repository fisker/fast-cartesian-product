module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // debug: true,
        corejs: 3,
        exclude: ['transform-typeof-symbol', 'transform-regenerator'],
        // useBuiltIns: 'usage',
        modules: false,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-transform-async-to-promises',
  ],
}
