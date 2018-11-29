const User = require('../models/users');
const bcrypt = require('bcrypt');

function signUp(req, resolve, reject) {
    const user = new User({
        email : req.body.email,
        username : req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save( err => {
        if(err) {
            reject(`Error creating the user: ${err}`);
        } else {
            resolve( `User ${user.username} created`);
        }
    })
}


module.exports = {
    signUp
}