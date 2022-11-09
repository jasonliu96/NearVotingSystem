const mongoose = require('mongoose')

const { Schema } = mongoose

const transactionSchema = new Schema({
  userId: { type: String, required: true },
  actionType: { type: String, required: true },
  receiptHash: { type: String, required: true },
},
{timestamps:true})

const transaction = mongoose.model('transaction', transactionSchema)
module.exports = {
  transaction,
}