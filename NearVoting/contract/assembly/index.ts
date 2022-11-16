import { context, storage, logging, PersistentMap,  PersistentVector, Context } from 'near-sdk-as';
import { Candidate, CandidateList, Ballot } from './model';
const CANDIDATE_LIMIT = 10

var candidateMap = new PersistentMap<string, i16>("pm");
var candidateVector = new PersistentVector<string>("pv");
var ballot = new Ballot(candidateVector, candidateMap);

export function addCandidateCompressed(compressed_candidate: string): void{
    ballot.addCandidate(compressed_candidate);
    var candidateCounter = storage.getPrimitive<i8>("candidate_counter", 0);
    candidateCounter +=1;
    storage.set<i8>("candidate_counter", candidateCounter);
}

export function voteCandidateMap(candidate_oid: string): void{
    ballot.voteCandidate(candidate_oid);
    var voteCounter = storage.getPrimitive<i16>("voter_counter", 0);
    voteCounter +=1; 
    storage.set<i16>("vote_counter", voteCounter);
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
    if(Context.contractName == Context.sender){
        ballot.resetBallot();
        storage.set<i16>("vote_counter", 0);
        storage.set<i8>("candidate_counter", 0);
    } else { 
        logging.log(`Access Denied`)
    }
}

export function deleteCandidate(compressed_candidate: string):String{
    const currentPhase = storage.getPrimitive<i8>("current_phase", 0);
    if(currentPhase==1){
        ballot.deleteCandidate(compressed_candidate);
        var candidateCounter = storage.getPrimitive<i8>("candidate_counter", 0);
        candidateCounter -=1;
        storage.set<i8>("candidate_counter", candidateCounter);
        return "Candidate Successfully Deleted"
    } 
    else {
        const msg = `Candidates can only be deleted during registration phase`
        logging.log(msg)
        return msg;
    }
}
export function getNumVotes():i16 {
    return storage.getPrimitive<i16>("vote_counter", 0);
}

export function getNumCandidates(): i8 {
    return storage.getPrimitive<i8>("candidate_counter", 0);
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