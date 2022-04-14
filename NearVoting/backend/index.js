const express = require('express');
const app = express();
const port = 9999
const nearAPI = require("near-api-js");
const networkId =  process.env.NEAR_CLI_LOCALNET_NETWORK_ID || 'local';
const nodeUrl= process.env.NEAR_NODE_URL || 'http://localhost:3030';
const keyPath= process.env.NEAR_CLI_LOCALNET_KEY_PATH || `${process.env.HOME}/.near/validator_key.json`;
const walletUrl= process.env.NEAR_WALLET_URL || 'http://localhost:4000/wallet';
const helperUrl= process.env.NEAR_HELPER_URL || 'http://localhost:4000/helper';
const masterAccount= 'test.near';
const contractName= process.env.CONTRACT_NAME || 'default_contract';

const printConfig = () => {
    console.log(`networkId: ${networkId}`)
    console.log(`nodeUrl: ${nodeUrl}`)
    console.log(`keyPath ${keyPath}`)
    console.log(`walletUrl ${walletUrl}`)
    console.log(`helperUrl ${helperUrl}`)
    console.log(`master Account ${masterAccount}`)
    console.log(`contractName ${contractName}`)
}
printConfig()

doStuff = async function (){
    try{
        const near = await nearAPI.connect({
            networkId,
            nodeUrl,
            keyPath,
            walletUrl,
            helperUrl,
            masterAccount,
            contractName,
        })
        return near; 
    } catch (e) {
        console.log(e)
        return false
    }
}
doStuff()
app.get('/', (req, res) => {
    res.json({
        status:200,
        msg:"hello"
    })
})

app.listen(port);
console.log(`server listening on port port ${port}`)