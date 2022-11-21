const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { application } = require('express')
const config = require('./config')
const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = 9999

require('./models/voterschema')
const voter = require('./routes/voter/voterRoutes')
app.use('/voter', voter)

require('./models/candidateschema')
const candidate = require('./routes/candidate/candidateRoutes')
app.use('/candidate', candidate)

require('./models/testschema')
require('./models/transactionschema')
const transaction = require('./routes/transaction/transactionRoutes')
app.use('/transaction', transaction)

require('./models/adminschema')
const admin = require('./routes/Admin/adminroutes')
app.use('/admin', admin)

async function run() {
  app.get('/', async (req, res) => {
    res.send(200, 'Welcome to Near Voting')
  })

  app.listen(port)
  console.log(`server listening on port port ${port}`)
}

mongoose
  .connect(config.mongodb.conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    run()
  })
  .catch((err) => {
    console.log(err)
  })
