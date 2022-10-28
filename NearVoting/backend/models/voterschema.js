const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose

const voterSchema = new Schema({
  accountId: { type: String, required: true, unique: true, dropDups: true },
  hasVoted: { type: Boolean, default: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String, required: true },
  citizen: { type: String, required: true },
  assistance: { type: String, required: true },
  phone: { type: Number, required: true },
  identification: {
    type: Number,
    required: true,
    unique: true,
    dropDups: true,
  },
  email: { type: String, required: true },
  address: { type: String, required: true },
})

const voter = mongoose.model('voter', voterSchema)
voterSchema.plugin(uniqueValidator)
module.exports = {
  voter,
}
