import getType from './get-type'

function isFunction(object) {
  if (!object) {
    return false
  }

  const type = getType(object)

  if (/^(?:Async)?(?:Generator)?Function$/.test(type)) {
    return true
  }

  return false
}

export default isFunction
