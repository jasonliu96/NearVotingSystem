import { context, u128, PersistentVector, PersistentMap } from "near-sdk-as"

@nearBindgen
export class Candidate{
    constructor(public name: string, public votes: i16){

    }
}

@nearBindgen
export class Phase{
    constructor(public phase: string, public phasenumber: i16){

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
    getMap():Map<string,number>{
        const map = new Map<string, number>();
        for (let i=0; i<this.keys.length; i++){
            let tempKey = this.keys[i]
            map.set(tempKey, this.candidateMap.getSome(tempKey))
        }
        return map
    }
    addCandidate(new_candidate:string):void{
        this.keys.push(new_candidate);
        this.candidateMap.set(new_candidate, 0);
    }
    voteCandidate(candidate_oid:string):void{
        let vote_count = this.candidateMap.getSome(candidate_oid);
        vote_count+=1;
        this.candidateMap.set(candidate_oid, vote_count);
    }
    getCandidateVotes(candidate_oid:string):i16{
        return this.candidateMap.getSome(candidate_oid)
    }
}

export const CandidateList = new PersistentVector<Candidate>("c")
export const PhaseList = new PersistentVector<Phase>("f")