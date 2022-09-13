const mongoose = require('mongoose')

const { Schema } = mongoose

const candidateSchema = new Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  cityStateZip: { type: String, required: true },
  candidateId: { type: String, required: false , unique: true},
  statement: { type: Number, required: false , possibleValues: [ 'New (N)' , 'Amended (A)' ] },
  partyAffiliation: { type: String, required: true},
  office: { type: String, required: true},
  stateDistrict: { type: String, required: true },
})

const candidate = mongoose.model('candidate', candidateSchema)
module.exports = {
  candidate,
}