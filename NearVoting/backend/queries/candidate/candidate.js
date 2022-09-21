const mongoose = require('mongoose')
const CandidateInfo = mongoose.model('candidate')

const addCandidate = async (request, response) => {
  console.log(`add candidate to mongo request: ${JSON.stringify(request)}`)
  const {
    fullName,
    address,
    cityStateZip,
    candidateId,
    // statement,
    partyAffiliation,
    office,
    stateDistrict,
  } = request

  const candidate = new CandidateInfo({
    fullName,
    address,
    cityStateZip,
    candidateId,
    // statement,
    partyAffiliation,
    office,
    stateDistrict,
  })
  console.log('candidate req body: ')
  console.log(candidate)
  await candidate
    .save()
    .then((result) => {
      console.log('candidate added in mongodb')
      console.log(result)
      response.status = 200
      response.data = 'candidate added Successfully'
      response.id = result._id
      console.log(`Response: ${response.status} and ${response.data}`)
    })
    .catch((err) => {
      console.log(err)
      response.status = 400
      response.data = 'Error while adding candidate in mongoDB'
    })

  console.log('Already returned response')
  return response
}

const checkUniquecandidateId = async (request, response) => {
  console.log(
    `checkUniquecandidateId mongo request: ${JSON.stringify(request)}`,
  )
  const { candidateId } = request

  await CandidateInfo.find({ candidateId })
    .then((result) => {
      console.log('checkUniquecandidateId')
      console.log(result.length)
      console.log(result)
      if (result.length > 0) response.status = 201
      else response.status = 200

      console.log(`Response: ${response.status}`)
    })
    .catch((err) => {
      console.log(err)
      response.status = 400
    })

  return response
}

const getCandidateInfo = async (request, response) => {
  console.log(`getCandidateInfo mongo request: ${JSON.stringify(request)}`)
  response.data = request
  oids = request.oids; 
  var candInfo = [];

  for(var i =0; i<oids.length; i++){
    data = await CandidateInfo.findById(oids[i].name)
    console.log(data)
    const {fullName, partyAffiliation, office, stateDistrict} = data;
    cand={}
    cand.fullName=fullName
    cand.partyAffiliation=partyAffiliation
    cand.office=office
    cand.stateDistrict=stateDistrict
    cand.votes=oids[i].votes
    candInfo.push(cand)
  }
  response.data=candInfo
  return response
}
module.exports = { addCandidate , checkUniquecandidateId, getCandidateInfo }