'use strict'
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
    if(err) {
        throw console.log(`error to connect with database ${err}`);
    } else {
        console.log('Database connection established');
        app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
    }
})