/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjVjK
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* @fisker/eslint-config https://git.io/fjOeH */

module.exports = {
  root: true,
  env: {},
  // https://github.com/eslint/eslint/issues/11486
  parser: 'babel-eslint',
  parserOptions: {},
  extends: ['@fisker'],
  settings: {},
  rules: {},
  plugins: [],
  globals: {},
  overrides: [],
}
