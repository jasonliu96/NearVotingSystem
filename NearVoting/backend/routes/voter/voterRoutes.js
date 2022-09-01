const express = require('express')
const router = express.Router()

const { register } = require('../../queries/voter/register')

router.post('/registerVoter', async (req, res) => {
  try {
    console.log(`Register Voter request body: ${JSON.stringify(req.body)}`)

    let results = null
    results = await register(req.body, res)
    console.log(`routes results ${results.data} and ${results.status}`)
    // res.data = results.data
    // res.status = results.status
    res.send(results.status, results.data)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

module.exports = router
