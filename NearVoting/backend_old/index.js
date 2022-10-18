const { compress } = require('lz-string');

async function run(){
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json())
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
    const ACCOUNT_ID = "master.test.near";
    const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
    const LZString = require('lz-string');

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
        "master.test.near",
        {
        // name of contract you're connecting to
        changeMethods: ['getCandidates', 'addCandidate', 'voteCandidate', 'addCandidateString', 
    'getCandidateString','getCandidateMap', 'voteCandidateMap' ], // change methods modify state
        sender: account, // account object to initialize and sign transactions.
        }
    );
    app.get('/getCandidates', async (req,res) => {
        try {
            const result = await contract.getCandidates({args:{}, gas:300000000000000});
            res.json(
                {status:200,
                 result
                }
            )
        }
        catch (e)
        {
            console.log(e)
            res.json({status:404, msg:e})
        }
    })
    let counter =0; 
    app.post('/addCandidate', async (req,res) => {
        ({text} = req.body);
        text = text.concat(counter);
        counter++;
        try {
            const result = await contract.addCandidate({args:{'text':text}});
            res.json(
                {status:200,
                 result
                }
            )
        }
        catch (e)
        {
            console.log(e)
            res.json({status:404, msg:e})
        }
    })
    app.post('/voteCandidate', async (req,res) => {
        ({idx} = req.body);
        try {
            const result = await contract.voteCandidateMap({args:{'candidate_oid':idx}});
            res.json(
                {status:200,
                 result
                }
            )
        }
        catch (e)
        {
            console.log(e)
            res.json({status:404, msg:e})
        }
    })

    app.get('/getCandidatesDecompressed', async (req,res) => {
        try {
            var result = await contract.getCandidateString({args:{}, gas:300000000000000});
            var decompressedString = LZString.decompress(result)
            // let candidates = decompressedString.split("|");
            res.json(
                {status:200,
                 decompressedString
                }
            )
        }
        catch (e)
        {
            console.log(e)
            res.json({status:404, msg:e})
        }
    })

    app.post('/addCandidateCompressed', async (req,res) => {
        ({text} = req.body);
        candidateName = text.concat(counter);
        counter++;
        try{
            let compressedString = await contract.getCandidateString({args:{}, gas:300000000000000});
            let compStr = "";
            if(compressedString=="No Candidates"){
                compressedString = LZString.compress(candidateName)
            }
            else{
                compStr = LZString.decompress(compressedString)
                compStr = compStr.concat("|", candidateName)
                compressedString = LZString.compress(compStr)
            }
            const result = await contract.addCandidateString({args:{'compressed_candidates':compressedString, 'new_candidate':candidateName}});
            res.json(
                {status:200,
                    compressedString
                }
            )
        }
        catch (e){
            console.log(e)
            res.json({status:404, msg:e})
        }
    })


    app.get('/getCandidatesMap', async (req,res) => {
        try {
            var result = await contract.getCandidateMap({args:{}, gas:300000000000000});
            res.json(
                {status:200,
                result
                }
            )
        }
        catch (e)
        {
            console.log(e)
            res.json({status:404, msg:e})
        }
    })

    app.listen(port);
    console.log(`server listening on port port ${port}`);
}
run()