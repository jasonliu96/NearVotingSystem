import { context, storage, logging, PersistentMap,  PersistentVector } from 'near-sdk-as';
import { Candidate, CandidateList, Phase, PhaseList, Ballot } from './model';
const CANDIDATE_LIMIT = 10

var candidateMap = new PersistentMap<string, i16>("pm");
var candidateVector = new PersistentVector<string>("pv");
var ballot = new Ballot(candidateVector, candidateMap);

export function addCandidate(text: string): void{
    const candidate = new Candidate(text, 0)
    CandidateList.push(candidate)
    const new_value = getNumCandidates() + 1;
    storage.set<i8>("candidate_counter", new_value);
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
// const regex = new RegExp("");

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
    const new_value = get_num() + 1;
    storage.set<i8>("vote_counter", new_value);
    logging.log("Increased number to " +  new_value.toString());
}

export function removeCandidate(index: i32): void {
    const new_value = getNumCandidates() - 1;
    storage.set<i8>("candidate_counter", new_value);
    CandidateList.swap_remove(index)
}

export function get_num(): i8 {
    return storage.getPrimitive<i8>("vote_counter", 0);
}

export function get_num_voters(): i8 {
    return storage.getPrimitive<i8>("voter_counter", 0);
}

export function getNumCandidates(): i8 {
    return storage.getPrimitive<i8>("candidate_counter", 0);
}

// Public method - Reset to zero
export function reset(): void {
    storage.set<i8>("vote_counter", 0);
    logging.log("Reset counter to zero");
}

//function to save states
export function addstate(text: string): void{
    const phase = new Phase(text, 0)
    PhaseList.push(phase)
}

export function getPhases(): Phase[] {
    
    const result = new Array<Phase>();
    for (let i=0; i<PhaseList.length; i++){
        result[i] = PhaseList[i];
    }
    return result;
}

export function setPhase(phase: i8): void{
    storage.set<i8>("current_phase", phase)
}

export function getPhase(): i8 {
    return storage.getPrimitive<i8>("current_phase", 1)
}