const mongoose = require('mongoose')

const { Schema } = mongoose

const voterSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String, required: true },
  citizen: { type: String, required: true },
  assistance: { type: String, required: true },
  phone: { type: Number, required: true },
  identification: { type: Number, required: true, unique: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
})

const voter = mongoose.model('voter', voterSchema)
module.exports = {
  voter,
}
