require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/bookshelf',
    SECRET_KEY : process.env.SECRET_KEY || 'my_secret_key',
    EXP_TIME : '5d'
}