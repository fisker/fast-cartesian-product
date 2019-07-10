const {hasOwnProperty} = Object.prototype

export default (object, property) => hasOwnProperty.call(object, property)
