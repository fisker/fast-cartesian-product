import hasOwnProperty from './has-own-property'

function hasLength(iterable) {
  return hasOwnProperty.call(iterable, 'length')
}

export default hasLength
