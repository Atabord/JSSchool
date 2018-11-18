'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const books = require('./routes/books');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/books', books);
app.use('/users', users);

module.exports = app;