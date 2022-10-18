

const oids = "632b3bd151339158d5cfdac3|632b3e1b51339158d5cfdad5|632b4d26f700a18815fcd898"

const elon = "631e503ffb94012e3030dca0"
const elon2 = "631e503ffb94012e3030dca0"

var new_oids = oids.concat("|")
new_oids = new_oids.concat(elon)

const Delta = require('fossil-delta')



let counter =0;
var compressedString = "No Candidates"


delta = Delta.create(oids, new_oids)
console.log(delta)

console.log(Delta.outputSize(delta))

decompressed = Delta.apply(new_oids, delta)
console.log(decompressed)

console.log(decompressed.join(""))

// async function testCompressedString(newCand){
//     if(counter>0){
//         newCand = newCand.concat(counter)
//     }
//     let compStr = "";
//     if(compressedString=="No Candidates"){
//         compressedString= await LZUTF8.compress(newCand, {outputEncoding:"StorageBinaryString"})
//     }
//     else{
//         compStr =  await LZUTF8.decompress(compressedString, {inputEncoding:"StorageBinaryString", outputEncoding:"String"})
//         compStr = compStr.concat("|", newCand)
//         compressedString= await LZUTF8.compress(compStr, {outputEncoding:"StorageBinaryString"})
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
//     const finaldecomp = await LZUTF8.decompress(compressedString, {inputEncoding:"StorageBinaryString", outputEncoding:"String"})
//     console.log(`final decompressed sequence ${finaldecomp}`)
// }

// run();