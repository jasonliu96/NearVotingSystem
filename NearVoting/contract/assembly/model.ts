import { context, u128, PersistentVector } from "near-sdk-as"

@nearBindgen
export class Candidate{
    constructor(public name: string){

    }
}

export const CandidateList = new PersistentVector<Candidate>("c")
CandidateList.push(new Candidate("Candidate 2"))