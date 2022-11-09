const express = require('express')
const router = express.Router()

const { getTransactions, addTransaction } = require('../../queries/transaction/transaction')

router.get('/getTransactions', async (req, res) => {
  try {
    // console.log(`Get Transaction request body: ${JSON.stringify(req.query)}`)

    let results = null
    results = await getTransactions(req.query, res)
    // console.log(`routes results ${results.data} and ${results.status}`)
    res.send(results.status, {transactions:results.data})
  } catch (err) {
    console.log(`Catch error: ${err}`)
    return err
  }
})

router.post('/addTransaction', async(req, res) => {
    try{
        // console.log(`Get Transaction request body: ${JSON.stringify(req.body)}`)

        let results = null
        results = await addTransaction(req.body, res)
        // console.log(`routes results ${results.data} and ${results.status}`)
        res.send(results.status, {"msg":results.data})
      } catch (err) {
        console.log(`Catch error: ${err}`)
        return err
      }
})

module.exports = router