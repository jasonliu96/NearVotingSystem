const mongoose = require('mongoose')
const VoterInfo = mongoose.model('voter')

const register = async (request, response) => {
  console.log(`register voter to mongo request: ${JSON.stringify(request)}`)
  const {
    accountId,
    firstName,
    lastName,
    name,
    citizen,
    assistance,
    phone,
    identification,
    email,
    address,
  } = request

  const voter = new VoterInfo({
    accountId,
    firstName,
    lastName,
    name,
    citizen,
    assistance,
    phone,
    identification,
    email,
    address,
  })
  console.log('voter req body: ')
  console.log(voter)
  await voter
    .save()
    .then((result) => {
      console.log('voter registered in mongodb')
      console.log(result)
      response.status = 200
      response.data = 'voter registered Successfully'
      console.log(`Response: ${response.status} and ${response.data}`)
    })
    .catch((err) => {
      console.log(err)
      response.status = 400
      response.data = 'Error while registering voter in mongoDB'
    })

  return response
}

const checkUniqueIdentification = async (request, response) => {
  console.log(
    `checkUniqueIdentification mongo request: ${JSON.stringify(request)}`,
  )
  const { identification } = request

  await VoterInfo.find({ identification })
    .then((result) => {
      console.log('checkUniqueIdentification')
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

const getHasVoted = async (request, response) => {
  console.log(`getHasVoted mongo request: ${JSON.stringify(request)}`)
  const { accountId } = request

  await VoterInfo.find({ accountId })
    .then((result) => {
      console.log('getHasVoted results:')
      console.log(result.length)
      console.log(result)
      if (result.length > 0) {
        response.status = 201
        response.data = result
      } else response.status = 200

      console.log(`Response: ${response.status}`)
    })
    .catch((err) => {
      console.log(err)
      response.status = 400
    })

  return response
}

const updateHasVoted = async (request, response) => {
  console.log(`updateHasVoted mongo request: ${JSON.stringify(request)}`)
  const { accountId } = request

  await VoterInfo.updateOne(
    { accountId: accountId },
    { $set: { hasVoted: true } },
  )
    .then((result) => {
      console.log('updateHasVoted')
      console.log(result)
      if (result.modifiedCount == 1) response.status = 201
      else response.status = 200

      console.log(`Response: ${response.status}`)
    })
    .catch((err) => {
      console.log(err)
      response.status = 400
    })

  return response
}

const getHasRegistered = async (request, response) => {
  console.log(`getHasRegistered mongo request: ${JSON.stringify(request)}`)
  const { accountId } = request

  await VoterInfo.find({ accountId })
    .then((result) => {
      console.log('getHasRegistered results:')
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

const getVoterProfile = async (request, response) => {
  console.log(`getVoterProfile mongo request: ${JSON.stringify(request)}`)
  const { accountId } = request

  await VoterInfo.find({ accountId })
    .then((result) => {
      console.log('getVoterProfile results:')
      console.log(result.length)
      console.log(result)
      if (result.length > 0) {
        response.status = 201
        response.data = result
      } else response.status = 200

      console.log(`Response: ${response.status}`)
    })
    .catch((err) => {
      console.log(err)
      response.status = 400
    })

  return response
}

module.exports = {
  register,
  checkUniqueIdentification,
  getHasVoted,
  updateHasVoted,
  getHasRegistered,
  getVoterProfile,
}
