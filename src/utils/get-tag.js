const {toString} = Object.prototype

function getTag(object) {
  return toString.call(object).slice(8, -1)
}

export default getTag
