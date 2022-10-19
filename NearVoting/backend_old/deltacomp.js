

const oids = "632b3bd151339158d5cfdac3|632b3e1b51339158d5cfdad5|632b4d26f700a18815fcd898"

const elon = "631e503ffb94012e3030dca0"

var new_oids = oids.concat("|")
new_oids = new_oids.concat(elon)

const Delta = require('fossil-delta')

const oid_array = ["632b3bd151339158d5cfdac3","632b3e1b51339158d5cfdad5", "632b4d26f700a18815fcd898"]
const diff = ["632b3bd151339158d5cfdac3","632b3e1b51339158d5cfdad5", "632b4d26f700a18815fcd898", "631e503ffb94012e3030dca0"]

let counter =0;
var compressedString = "No Candidates"


delta = Delta.create(oids, new_oids)
// console.log(delta.length)
console.log(delta)

console.log(Delta.outputSize(delta))


decompressed = Delta.apply(oids, delta)
console.log(decompressed)

// console.log(decompressed.join(""))

// diff2 =  diff.concat(elon)
// console.log(Delta.create(diff,diff2))
