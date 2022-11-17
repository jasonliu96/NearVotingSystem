const express = require('express')
const router = express.Router()

const { 
  addCandidate, 
  checkUniquecandidateId, 
  getCandidateInfo,
  getIfRegistered,
  getCandidateProfile,
} = require('../../queries/candidate/candidate')

router.post('/addCandidate', async (req, res) => {
  try {
    // console.log(`Add Candidate request body: ${JSON.stringify(req.body)}`)

    let results = null
    results = await addCandidate(req.body, res)
    // console.log(`routes results ${results.data} and ${results.status}`)
    res.send(results.status, {"msg":results.data, "id":results.id})
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
    // console.log(`checkUniquecandidateId results ${results.status}`)
    res.sendStatus(results.status)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/getCandidateInfo', async (req, res) => {
  try{
    // console.log(`getCandidateInfo req body: ${JSON.stringify(req.body)}`)
    results = await getCandidateInfo(req.body, res)
    // console.log(results.data)
    res.send(200, results.data)
  } catch(err) {
    console.log(`error from getCandidateInfo: ${err}`)
    return err
  }
})

router.post('/getIfRegistered', async (req, res) => {
  try {
    console.log(
      `Check if candidate has already registered: ${JSON.stringify(req.body)}`,
    )

    let results = null
    results = await getIfRegistered(req.body, res)
    console.log(`getIfRegistered results ${results.status}`)
    res.sendStatus(results.status)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/getCandidateProfile', async (req, res) => {
  try {
    console.log(`Retreive candidate profile: ${JSON.stringify(req.body)}`)

    let results = null
    results = await getCandidateProfile(req.body, res)
    console.log(`getCandidateProfile results ${results.status}`)

    let respData = {
      status: results.status,
      data: results.data,
    }
    console.log(`getCandidateProfile results ${JSON.stringify(respData)}`)
    res.send(JSON.stringify(respData))
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})
module.exports = router