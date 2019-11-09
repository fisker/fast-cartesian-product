# fast-cartesian-product

> super fast cartesian product

before `v1.0.0` this module was not focusing on speed, now it's split into to two modules:

- [`fast-cartesian-product`](https://github.com/fisker/fast-cartesian-product)

  focusing on speed, and only work on arrays(arrayLikes is also supported, but not recommended)

- [`power-cartesian-product`](https://github.com/fisker/power-cartesian-product)

  focusing on unlimited combinations, less memory, more types, if you need more powerful tool, use this one

## Examples

```js
import fastCartesianProduct from 'fast-cartesian-product'

const inputs = [
  [0, 1],
  ['A', 'B'],
]

console.log(fastCartesianProduct(inputs))
// [ [ 0, 'A' ], [ 0, 'B' ], [ 1, 'A' ], [ 1, 'B' ] ]
```

more examples

```sh
git clone https://github.com/fisker/fast-cartesian-product.git
cd fast-cartesian-product
yarn
node -r esm examples/standard-52-card-deck.js
```

## Files

```text
lib/
├─ index.common.js  ( CommonJS )
├─ index.js         ( UMD )
├─ index.min.js     ( UMD, compressed )
├─ index.mjs        ( ES Module )
└─ index.min.mjs    ( ES Module, compressed )
```

## API

### combinations = fastCartesianProduct(sets)

Returns: array of combinations

#### sets

type: `array`
