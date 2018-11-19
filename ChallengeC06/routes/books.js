'use strict'
const express = require('express');
const books = express.Router();
const bookControllers = require('../controllers/bookControllers');

function ensureToken (req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

// post to create a new book
books.post('/new', ensureToken, bookControllers.createBook);

// endpoint to get all the books or all the books on a bookshelf
books.get('/', ensureToken, bookControllers.getAllBooks);

// endpoint to get 1 specific book
books.get('/:book', ensureToken, bookControllers.getOneBook);

// endpoint to lend an specific book
books.patch('/:book/lend', ensureToken, bookControllers.lendBook);

module.exports = books;