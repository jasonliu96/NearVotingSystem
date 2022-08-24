const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { application } = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 9999;


async function run(){

    app.get('/', async (req,res) => {
        res.send(200, 'Welcome to Near Voting')
    })

    app.listen(port);
    console.log(`server listening on port port ${port}`)
}

run();