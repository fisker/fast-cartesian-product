import isValue from './is-value'

const {hasOwnProperty} = Object.prototype

export default (object, property) =>
  isValue(object) && hasOwnProperty.call(object, property)
