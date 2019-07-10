const {toString} = Object.prototype

function getType(object) {
  return toString.call(object).slice(8, -1)
}

export default getType
