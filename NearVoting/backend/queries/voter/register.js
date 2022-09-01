const mongoose = require('mongoose')
const VoterInfo = mongoose.model('voter')

const register = async (request, response) => {
  console.log(`register voter to mongo request: ${JSON.stringify(request)}`)
  const {
    firstName,
    lastName,
    citizen,
    assistance,
    phone,
    identification,
    email,
    address,
  } = request

  const voter = new VoterInfo({
    firstName,
    lastName,
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

  console.log('Already returned response')
  return response
}

module.exports = { register }
