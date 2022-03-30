import { context, u128, PersistentVector } from "near-sdk-as"

@nearBindgen
export class Candidate{
    constructor(public name: string, public votes: number){

    }
}

export const CandidateList = new PersistentVector<Candidate>("c")