const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose

const adminSchema = new Schema({
  accountId: { type: String, required: true, unique: true, dropDups: true },
})

const admin = mongoose.model('admin', adminSchema)
adminSchema.plugin(uniqueValidator)
module.exports = {
  admin,
}
