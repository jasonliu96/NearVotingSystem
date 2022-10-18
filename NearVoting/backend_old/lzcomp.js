

const oids = "632b3bd151339158d5cfdac3|632b3e1b51339158d5cfdad5|632b4d26f700a18815fcd898"

const elon = "631e503ffb94012e3030dca0"
const elon2 = "631e503ffb94012e3030dca0"

var new_oids = oids.concat("|")
new_oids = new_oids.concat(elon)

const LZString = require('lz-string')
const LZUTF8 = require('lzutf8')


// console.log("pre compression")
// console.log(oids.length)
// var comp = LZString.compress(oids)

// console.log("post compression")
// console.log(comp)
// console.log(comp.length)

// var decomp = LZString.decompress(comp)
// decomp = decomp.concat("|", elon)
// console.log(decomp)

// compdecomp = LZString.compress(decomp)

// console.log(compdecomp)
// console.log(compdecomp.length)

let counter =0;
var compressedString = "No Candidates"

async function testCompressedString(newCand){
    if(counter>0){
        newCand = newCand.concat(counter)
    }
    let compStr = "";
    if(compressedString=="No Candidates"){
        compressedString= await LZUTF8.compress(newCand, {outputEncoding:"StorageBinaryString"})
    }
    else{
        compStr =  await LZUTF8.decompress(compressedString, {inputEncoding:"StorageBinaryString", outputEncoding:"String"})
        compStr = compStr.concat("|", newCand)
        compressedString= await LZUTF8.compress(compStr, {outputEncoding:"StorageBinaryString"})
    }
    counter++;
}


async function run(){
    await testCompressedString(elon)
    console.log(`0: ${compressedString}`)
    await testCompressedString(elon2)
    console.log(`1: ${compressedString}`)
    await testCompressedString(elon)
    console.log(`2: ${compressedString}`)
    await testCompressedString(elon2)
    console.log(`3: ${compressedString}`)
    const finaldecomp = await LZUTF8.decompress(compressedString, {inputEncoding:"StorageBinaryString", outputEncoding:"String"})
    console.log(`final decompressed sequence ${finaldecomp}`)
}

run();