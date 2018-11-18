'use strict'

const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config');

function signUp(req, res) {
    const user = new User({
        email : req.body.email,
        username : req.body.username,
        password: req.body.password
    });

    user.save( err => {
        if(err) {
            res.status(500)
                .send({message: `Error creating the user: ${err}`});
        } else {
            return res.status(200).send({ message: 'User created' });
                    // .send({ token: service.createToken(user) });
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
            if(user.password === password) {
                res.status(200).send({token: jwt.sign({ user }, config.SECRET_KEY)});
            } else {
                res.status(400).send({message: 'wrong password'});
            }
        }
    })
}

module.exports = {
    signUp,
    signIn
}