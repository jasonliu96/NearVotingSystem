const LZUTF8 = require('lzutf8')

console.log("1")
console.log(LZUTF8.compress("631e503ffb94012e3030dca0", {outputEncoding:"StorageBinaryString"}))
console.log("2")