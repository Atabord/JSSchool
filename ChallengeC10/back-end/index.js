'use strict'
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');

io.on('connection', (socket) => {
    socket.on('lend message', (message) => {
        io.sockets.emit('lent book', message);
    });
});

mongoose.connect(config.db, (err, res) => {
    if(err) {
        throw console.log(`error to connect with database ${err}`);
    } else {
        console.log('Database connection established');
        http.listen(config.port, () => console.log(`Listening on port ${config.port}`));
    }
});