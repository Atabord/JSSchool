'use strict'

const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

function signUp(req, res) {
    const user = new User({
        email : req.body.email,
        username : req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save( err => {
        if(err) {
            res.status(500)
                .send({message: `Error creating the user: ${err}`});
        } else {
            user.password = undefined;
            return res.status(200).send({ message: 'User created' });
        }
    })
}

function signIn(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, (err, user) => {
        if(err) {
            res.status(500).send({message: `Error making the request ${err}`});
        } else if(!user) {
            res.status(404).send({message: `That user doesn't exist`});
        } else {
            // res.status(200).send({ user });
            if(!user.comparePassword(password)) {
                res.status(400).send({message: 'wrong password'});
            } else {
                res.status(200).send({token: jwt.sign({ user }, config.SECRET_KEY, { expiresIn: '4h'})});
            }
        }
    })
}

module.exports = {
    signUp,
    signIn
}