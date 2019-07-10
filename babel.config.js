module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // debug: true,
        corejs: 3,
        exclude: ['transform-typeof-symbol', 'transform-async-to-generator'],
        // useBuiltIns: 'usage',
        modules: false,
      },
    ],
  ],
}
