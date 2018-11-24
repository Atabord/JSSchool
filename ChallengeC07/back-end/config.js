require('dotenv').config();

module.exports = {
    port: 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/bookshelf'
}