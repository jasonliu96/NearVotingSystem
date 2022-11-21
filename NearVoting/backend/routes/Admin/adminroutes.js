const express = require('express')
const router = express.Router()

const { checkIsAdmin } = require('../../queries/Admin/adminqueries')

router.post('/checkIsAdmin', async (req, res) => {
  try {
    console.log(`checkIsAdmin request body: ${JSON.stringify(req.body)}`)

    let results = null
    results = await checkIsAdmin(req.body, res)
    console.log(`checkIsAdmin results ${results.status}`)
    res.sendStatus(results.status)
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

module.exports = router
