'use strict'
const express = require('express');
const users = express.Router();
const auth = require('../controllers/auth');

users.post('/signUp', auth.signUp);
users.post('/signIn', auth.signIn);

module.exports = users;