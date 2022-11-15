import { context, storage, logging, PersistentMap,  PersistentVector, Context } from 'near-sdk-as';
import { Candidate, CandidateList, Ballot } from './model';
const CANDIDATE_LIMIT = 10

var candidateMap = new PersistentMap<string, i16>("pm");
var candidateVector = new PersistentVector<string>("pv");
var ballot = new Ballot(candidateVector, candidateMap);

export function addCandidateCompressed(compressed_candidate: string): void{
    ballot.addCandidate(compressed_candidate);
}

export function voteCandidateMap(candidate_oid: string): void{
    ballot.voteCandidate(candidate_oid);
}

export function getCandidateMap():Map<string,number>{
    return ballot.getMap();
}

export function getCandidateArray():Candidate[]{
    return ballot.getAllValues();
}

export function getCandidateVote(candidate_oid:string):i16{
    return ballot.getCandidateVotes(candidate_oid);
}

export function resetBallot():void{
    candidateMap = new PersistentMap<string, i16>("pm");
    candidateVector = new PersistentVector<string>("pv");
    ballot = new Ballot(candidateVector, candidateMap);
}

export function clearCandidates(): void{
    for (let i=0; i<CandidateList.length; i++){
        CandidateList.pop()
    }
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

export function getInfo():void{
    logging.log(`Context.contract name: , ${Context.contractName}`);
    logging.log(`Context.sender: , ${Context.sender}`);
    logging.log(`Context.predecessor: , ${Context.predecessor}`);
}


/**
 * set function to track the phases of the voting process 
 * @param phase integer 
 */
export function setPhase(phase: i8): void{
    storage.set<i8>("current_phase", phase)
}

/**
 * get function to return phase from smart contract
 * @returns phase integer from storage on default returns 1
 */
export function getPhase(): i8 {
    return storage.getPrimitive<i8>("current_phase", 1)
}