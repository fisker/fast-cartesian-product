import fastCartesianProduct from '../src/index.js'

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['♣', '♦', '♥', '♠']

const deck = fastCartesianProduct([ranks, suits])

console.log(deck)
