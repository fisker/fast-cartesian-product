module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // debug: true,
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
        // useBuiltIns: 'usage',
        modules: false,
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
