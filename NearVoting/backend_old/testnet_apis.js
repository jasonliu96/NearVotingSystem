async function run(){
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json())
    const port = 7777;
    const path = require("path");
    const homedir = require("os").homedir();
    const { connect, KeyPair, keyStores, utils, Contract } = require("near-api-js");

    const CREDENTIALS_DIR = ".near-credentials";
    const ACCOUNT_ID = "laptopliuj.testnet";
    const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

    const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    };

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
        changeMethods: ['getCandidates', 'addCandidate', 'voteCandidate'], // change methods modify state
        sender: account, // account object to initialize and sign transactions.
        }
    );
    app.get('/getCandidates', async (req,res) => {
        try {
            const result = await contract.getCandidates({
            });
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
        ({text} = req.body)
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
        res.json({ status:200, msg:"added" })
    })
    app.listen(port);
    console.log(`server listening on port port ${port}`)
}
run()