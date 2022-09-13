import { context, u128, PersistentVector } from "near-sdk-as"

@nearBindgen
export class Candidate{
    constructor(public name: string, public votes: number){

    }
}

@nearBindgen
export class Phase{
    constructor(public phase: string, public phasenumber: number){

    }
}

export const CandidateList = new PersistentVector<Candidate>("c")
export const PhaseList = new PersistentVector<Phase>("f")