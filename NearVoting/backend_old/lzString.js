const {compress, decompress} = require('lz-string');


const oids = "632b3bd151339158d5cfdac3|632b3e1b51339158d5cfdad5|632b4d26f700a18815fcd898"

const elon = "631e503ffb94012e3030dca0"
const elon2 = "631e503ffb94012e3030dca0"

var new_oids = oids.concat("|")
new_oids = new_oids.concat(elon)

const map = new Map()
map.set("632b3bd151339158d5cfdac3", 0)
map.set("632b3e1b51339158d5cfdad5", 0)
map.set("632b4d26f700a18815fcd898", 0)
map.set("631e503ffb94012e3030dca0", 0)

console.log(map)
for (let key of map.keys()) {
    console.log(key)
}
let counter =0;
var compressedString = "No Candidates"

// async function testCompressedString(newCand){
//     if(counter>0){
//         newCand = newCand.concat(counter)
//     }
//     let compStr = "";
//     if(compressedString=="No Candidates"){
//         compressedString= compress(newCand)
//     }
//     else{
//         compStr =  decompress(compressedString)
//         compStr = compStr.concat("|", newCand)
//         compressedString= compress(compStr)
//     }
//     counter++;
// }


// async function run(){
//     await testCompressedString(elon)
//     console.log(`0: ${compressedString}`)
//     await testCompressedString(elon2)
//     console.log(`1: ${compressedString}`)
//     await testCompressedString(elon)
//     console.log(`2: ${compressedString}`)
//     await testCompressedString(elon2)
//     console.log(`3: ${compressedString}`)
//     const finaldecomp = decompress(compressedString)
//     console.log(`final decompressed sequence ${finaldecomp}`)
// }

// run();