const mongoose = require('mongoose');
const models = require('./models/testschema');
const config = require('./config');

mongoose.connect(config.mongodb.conn, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const newTest = new models.test ({name:'firstTest'});
newTest.save((err) => {
    if(err) return handleError(err);
})