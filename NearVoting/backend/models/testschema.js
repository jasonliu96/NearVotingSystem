const mongoose = require('mongoose');

const { Schema } = mongoose;

const testSchema = new Schema({
    name: {type:String, required: true, unique: true},
},
{ timestamps: true })

const test = mongoose.model('test', testSchema);
module.exports = {
    test
}