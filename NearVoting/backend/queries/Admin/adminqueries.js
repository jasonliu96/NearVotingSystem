const mongoose = require('mongoose')
const Admin = mongoose.model('admin')

const checkIsAdmin = async (request, response) => {
  console.log(`checkIsAdmin mongo request: ${JSON.stringify(request)}`)
  const { accountId } = request

  await Admin.find({ accountId })
    .then((result) => {
      console.log('checkIsAdmin results from mongo')
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

module.exports = {
  checkIsAdmin,
}
