'use strict'
const express = require('express');
const books = express.Router();
const bookControllers = require('../controllers/bookControllers');

// post to create a new book
books.post('/new', bookControllers.createBook);

// endpoint to get all the books or all the books on a bookshelf
books.get('/', bookControllers.getAllBooks);

// endpoint to get 1 specific book
books.get('/:book', bookControllers.getOneBook);

// endpoint to lend an specific book
books.patch('/:book/lend', bookControllers.lendBook);

module.exports = books;