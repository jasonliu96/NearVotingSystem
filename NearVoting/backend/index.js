async function run(){
    const express = require('express');
    const app = express();
    const port = 9999;
    const path = require("path");
    const homedir = require("os").homedir();
    const { connect, KeyPair, keyStores, utils, Contract } = require("near-api-js");
    const networkId =  process.env.NEAR_CLI_LOCALNET_NETWORK_ID || 'local';
    const nodeUrl= process.env.NEAR_NODE_URL || 'http://localhost:3030';
    const keyPath= process.env.NEAR_CLI_LOCALNET_KEY_PATH || `${process.env.HOME}/.near/validator_key.json`;
    const walletUrl= process.env.NEAR_WALLET_URL || 'http://localhost:4000/wallet';
    const helperUrl= process.env.NEAR_HELPER_URL || 'http://localhost:4000/helper';
    const masterAccount= 'test.near';
    const contractName= process.env.CONTRACT_NAME || 'default_contract';
    const explorerUrl = process.env.NEAR_EXPLORER_URL || 'http://localhost:4000/explorer';

    const CREDENTIALS_DIR = ".near-credentials";
    const CONTRACT_NAME = "laptopliuj.testnet";
    const METHOD_NAME = "getCandidates"
    const ACCOUNT_ID = "laptopliuj.testnet";
    const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

    const test_config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    };
    const config = {
        keyStore,
        networkId,
        nodeUrl,
        walletUrl,
        helperUrl,
        explorerUrl,
    };

    app.get('/configs', (req, res)=>{
        res.json({
            networkId: networkId,
            nodeUrl: nodeUrl,
            keyPath :keyPath,
            walletUrl :walletUrl,
            helperUrl :helperUrl,
            masterAccount :masterAccount,
            contractName :contractName,
        })
    })

    app.get('/', (req, res) => {
        res.json({
            status:200,
            msg:"hello"
        })
    })
    const near = await connect(config);
    const account = await near.account(ACCOUNT_ID);
    const contract = new Contract(
        account, // the account object that is connecting
        "laptopliuj.testnet",
        {
        // name of contract you're connecting to
        changeMethods: ['getCandidates', 'addCandidate'], // change methods modify state
        sender: account, // account object to initialize and sign transactions.
        }
    );
    app.get('/getCandidates', async (req,res) => {
        const result = await contract.getCandidates({
        });
        res.json(result)
    })
    app.listen(port);
    console.log(`server listening on port port ${port}`)
}
run()