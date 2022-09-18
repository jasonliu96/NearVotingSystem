const express = require('express')
const router = express.Router()

const { addCandidate, checkUniquecandidateId } = require('../../queries/candidate/candidate')

router.post('/addCandidate', async (req, res) => {
  try {
    console.log(`Add Candidate request body: ${JSON.stringify(req.body)}`)

    let results = null
    results = await addCandidate(req.body, res)
    console.log(`routes results ${results.data} and ${results.status}`)
    res.send(results.status, results.data)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/checkUniquecandidateId', async (req, res) => {
  try {
    console.log(
      `checkUniquecandidateId request body: ${JSON.stringify(req.body)}`,
    )

    let results = null
    results = await checkUniquecandidateId(req.body, res)
    console.log(`checkUniquecandidateId results ${results.status}`)
    res.sendStatus(results.status)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

module.exports = router