function lengthAccumulator(accumulator, {length}) {
  return accumulator * length
}

class FastCartesianProduct {
  constructor(sets) {
    this.sets = sets
  }

  get(index) {
    const setsArray = this.sets
    const {length: setsLength} = setsArray
    const set = new Array(setsLength)

    let indexRemaining = index

    let j = index

    for (let i = setsLength -1; i >= 0; i-=1) {
      const subSets = this.sets[i]

      const {length} = subSets
      const index = indexRemaining % length;
      indexRemaining -= index
      indexRemaining /= length
      set[i] = subSets[index]
    }

    return set
  }

  [Symbol.iterator] () {
    const instance = this
    const {size} = instance
    let index = 0

    return {
      next() {
        const done = index >= size
        const value = instance.get(index)

        index += 1

        return {
          value,
          done
        }
      }
    }
  }

  get size() {
    let size = 1
    const {length: setsLength} = this.sets
    for (let i = 0; i < setsLength; i+=1) {
      const subSets = this.sets[i]
      const {length} = subSets
      size = size * length
      if (!isFinite(size)) {
        break
      }
    }

    return size
  }
}

export default FastCartesianProduct
