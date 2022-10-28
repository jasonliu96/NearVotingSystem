const Delta = require('fossil-delta')

const oids = "632b3bd151339158d5cfdac3|632b3e1b51339158d5cfdad5|632b4d26f700a18815fcd898"

const elon = "631e503ffb94012e3030dca0"

var new_oids = oids.concat("|")
new_oids = new_oids.concat(elon)

const oid_array = ["632b3bd151339158d5cfdac3","632b3e1b51339158d5cfdad5", "632b4d26f700a18815fcd898"]
const new_oid_array = ["632b3bd151339158d5cfdac3","632b3e1b51339158d5cfdad5", "632b4d26f700a18815fcd898", elon]



function runString(){
    console.log(`Original String ${oids}`)
    console.log(`Length of Original String ${oids.length}`)

    console.log(`Target String ${new_oids}`)
    console.log(`Length of Target String ${new_oids.length}`)

    delta = Delta.create(oids, new_oids)
    stringdelta = delta.join("")
    console.log(`Delta: ${stringdelta}`)
    console.log(`Length of delta ${delta.length}`)

    console.log(`Expected Size after decompression ${Delta.outputSize(delta)}`)
}

runString()


console.log("=========================================================")

function runArray(){
    console.log(`Original Array ${oid_array}`)
    console.log(`Length of Original Array ${oid_array.length}`)

    console.log(`Target Array ${new_oid_array}`)
    console.log(`Length of Target Array ${new_oid_array.length}`)

    delta = Delta.create(oid_array, new_oid_array)
    console.log(`Delta: ${delta}`)
    console.log(`Length of delta ${delta.length}`)

    console.log(`Expected Size after decompression ${Delta.outputSize(delta)}`)
}

runArray()