import { context, u128, PersistentVector, PersistentMap } from "near-sdk-as"

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

@nearBindgen
export class Ballot
{
    constructor(private keys:PersistentVector<string>, private candidateMap:PersistentMap<string, i16>){}
    getAllValues():Candidate[]{
        const candidates = new Array<Candidate>();
        for (let i=0; i<this.keys.length; i++){
            let tempKey = this.keys[i]
            candidates.push(new Candidate(tempKey, this.candidateMap.getSome(tempKey)))
        }
        return candidates
    }
    addCandidate(cab:ArrayBuffer):void{
        const new_candidate = String.UTF8.decode(cab)
        this.keys.push(new_candidate);
        this.candidateMap.set(new_candidate, 0);
    }
    voteCandidate(candidate_oid:string):void{
        let vote_count = this.candidateMap.getSome(candidate_oid);
        vote_count+=1;
        this.candidateMap.set(candidate_oid, vote_count);
    }
}

export const CandidateList = new PersistentVector<Candidate>("c")
export const PhaseList = new PersistentVector<Phase>("f")