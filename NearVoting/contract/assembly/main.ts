import { Candidate, CandidateList } from './model';


const CANDIDATE_LIMIT = 10; 

export function addCandidate(text: string): void{
    const candidate = new Candidate(text)
    CandidateList.push(candidate)
}

export function getCandidates(): Candidate[] {
    const numCand = min(CANDIDATE_LIMIT, CandidateList.length);
    const startIndex = CandidateList.length - numCand;
    const result = new Array<Candidate>(numCand);
    for (let i=0; i<numCand; i++){
        result[i] = CandidateList[i+startIndex];
    }
    return result;
}