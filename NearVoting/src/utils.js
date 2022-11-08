import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'
import { compress, decompress } from 'lzutf8'
import axios from 'axios'
import constants from './constants'
const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')
console.log(process.env.NODE_ENV)
// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['getGreeting', 'getCandidates', 'get_num','getPhases', 'getPhase', 'getCandidateMap'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['setGreeting', 'addCandidateCompressed', 'voteCandidateMap', 'removeCandidate', 'addstate', 'setPhase'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export function compressOid(oid){
  return compress(oid, {inputEncoding:"String", outputEncoding:"StorageBinaryString"})
}

export function decompressOids(oid){
  return decompress(oid, {inputEncoding:"StorageBinaryString", outputEncoding:"String"})
}

export async function executeTransaction(methodType, args){
  const accountId = window.walletConnection.getAccountId()
  console.log(methodType)
  const response = await window.walletConnection.account().functionCall({
    contractId: nearConfig.contractName,
    methodName: constants[methodType],
    args
  })
  const { transaction_outcome: txo, status } = response;
  const data ={
    userId:accountId,
    actionType: methodDictionary[methodType],
    receiptHash: txo.outcome.receipt_ids[0]
  }
  await axios.post(`${nearConfig.serverUrl}/transaction/addTransaction`, data).then(
    (response) => {
        return response;
    },
    (error) => {
        return error;
    },
  )
}

const methodDictionary = {
  "ADD_CANDIDATE":"Candidate Registration",
  "VOTE":"Vote",
  "SET_PHASE":"Phase Change", 
}