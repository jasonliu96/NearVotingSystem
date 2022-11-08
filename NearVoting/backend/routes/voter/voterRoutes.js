const express = require('express')
const router = express.Router()

const {
  register,
  checkUniqueIdentification,
  getHasVoted,
  updateHasVoted,
  getHasRegistered,
  getVoterProfile,
} = require('../../queries/voter/register')

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

router.post('/checkUniqueIdentification', async (req, res) => {
  try {
    console.log(
      `CheckUniqueIdentification request body: ${JSON.stringify(req.body)}`,
    )

    let results = null
    results = await checkUniqueIdentification(req.body, res)
    console.log(`checkUniqueIdentification results ${results.status}`)
    res.sendStatus(results.status)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/getHasVoted', async (req, res) => {
  try {
    console.log(`Check if voter has already voted: ${JSON.stringify(req.body)}`)

    let results = null
    results = await getHasVoted(req.body, res)
    console.log(`getHasVoted results ${results.status}`)

    let respData = {
      status: results.status,
      data: results.data,
    }
    console.log(`getHasVoted results ${JSON.stringify(respData)}`)
    res.send(JSON.stringify(respData))
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/updateHasVoted', async (req, res) => {
  try {
    console.log(
      `Update that voter has cast a vote: ${JSON.stringify(req.body)}`,
    )

    let results = null
    results = await updateHasVoted(req.body, res)
    console.log(`updateHasVoted results ${results.status}`)
    res.sendStatus(results.status)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/getHasRegistered', async (req, res) => {
  try {
    console.log(
      `Check if voter has already registered: ${JSON.stringify(req.body)}`,
    )

    let results = null
    results = await getHasRegistered(req.body, res)
    console.log(`getHasRegistered results ${results.status}`)
    res.sendStatus(results.status)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/getVoterProfile', async (req, res) => {
  try {
    console.log(`Retreive voter profile: ${JSON.stringify(req.body)}`)

    let results = null
    results = await getVoterProfile(req.body, res)
    console.log(`getVoterProfile results ${results.status}`)

    let respData = {
      status: results.status,
      data: results.data,
    }
    console.log(`getVoterProfile results ${JSON.stringify(respData)}`)
    res.send(JSON.stringify(respData))
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})
module.exports = router
