import test from 'ava'

const cases = [
  {
    input: [],
    expected: [],
  },
  {
    input: [['A', 'B', 'C']],
    expected: [['A'], ['B'], ['C']],
  },
  {
    input: [['A', 'B', 'C'], ['M'], ['X', 'Y'], ['Z']],
    expected: [
      ['A', 'M', 'X', 'Z'],
      ['A', 'M', 'Y', 'Z'],
      ['B', 'M', 'X', 'Z'],
      ['B', 'M', 'Y', 'Z'],
      ['C', 'M', 'X', 'Z'],
      ['C', 'M', 'Y', 'Z'],
    ],
  },
  {
    input: [[false, true], ['a', 'b', 'c'], [{}]],
    expected: [
      [false, 'a', {}],
      [false, 'b', {}],
      [false, 'c', {}],
      [true, 'a', {}],
      [true, 'b', {}],
      [true, 'c', {}],
    ],
  },
  {
    input: [[1, 2, 3], [1, 2, 3]],
    expected: [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ],
  },
  {
    input: [[]],
    throws: new Error('`sets` should not has empty elements'),
  },
]

function tester(t, module_) {
  for (const {input, expected, throws} of cases) {
    if (throws) {
      t.throws(() => module_(input), throws.constructor, throws.message)
    } else {
      t.deepEqual(module_(input), expected, JSON.stringify(input))
    }
  }
}

export default tester
