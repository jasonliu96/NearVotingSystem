const { keyStores, connect } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const CONTRACT_NAME = "laptopliuj.testnet";
const METHOD_NAME = "getCandidates"
const ACCOUNT_ID = "new_acc4.testnet";
const WASM_PATH = "../out/main.wasm";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

apiCall(ACCOUNT_ID, CONTRACT_NAME, METHOD_NAME, {});

async function apiCall(accountId, contractId, methodName, args) {
  const near = await connect(config);
  const account = await near.account(accountId);
  const result = await account.functionCall({
    contractId,
    methodName,
    args,
  });
  console.log(result);
}