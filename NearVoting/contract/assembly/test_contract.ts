import { storage, Context, PersistentVector } from "near-sdk-as"

// return the string 'hello world'
export function helloWorld(): string {
  return 'hello world'
} 
var count = 2
const Candidates = new PersistentVector<string>("v");
Candidates.push("Candidate 1")
Candidates.push("Candidate 2")

export function getCandidates(): PersistentVector<string> {
    return storage.getSome<PersistentVector<string>>("v")
}

export function addCandidate(CandidateName: string): void{
    count = count+1
    Candidates.push(CandidateName)
}
// // read the given key from account (contract) storage
// export function read(key: string): string {
//   if (storage.hasKey(key)) {
//     return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
//   } else {
//     return `🚫 Key [ ${key} ] not found in storage. ( ${storageReport()} )`
//   }
// }

// // write the given value at the given key to account (contract) storage
// export function write(key: string, value: string): string {
//   storage.set(key, value)
//   return `✅ Data saved. ( ${storageReport()} )`
// }

// // private helper method used by read() and write() above
// function storageReport(): string {
//   return `storage [ ${Context.storageUsage} bytes ]`
// }