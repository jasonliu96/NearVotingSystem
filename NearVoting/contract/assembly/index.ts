import { Candidate, CandidateList } from './model';

const CANDIDATE_LIMIT = 10

export function addCandidate(text: string): void{
    const candidate = new Candidate(text, 0)
    CandidateList.push(candidate)
}

// export function getCandidates(): Candidate[] {
//     const numCand = min(CANDIDATE_LIMIT, CandidateList.length);
//     const startIndex = CandidateList.length - numCand;
//     const result = new Array<Candidate>(numCand);
//     for (let i=0; i<numCand; i++){
//         result[i] = CandidateList[i+startIndex];
//     }
//     return result;
// }

export function getCandidates(): Candidate[] {
    const result = new Array<Candidate>();
    for (let i=0; i<CandidateList.length; i++){
        result[i] = CandidateList[i];
    }
    return result;
}

export function clearCandidates(): void{
    for (let i=0; i<CandidateList.length; i++){
        CandidateList.pop()
    }
}

export function voteCandidate(index: i32):void {
    const name = CandidateList[index].name;
    let votes = CandidateList[index].votes;
    votes += 1;
    const newCandidate = new Candidate(name, votes)
    CandidateList.replace(index, newCandidate)
}

export function removeCandidate(index: i32): void {
    CandidateList.swap_remove(index)
}