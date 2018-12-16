'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
    title: String,
    authors: [String],
    publisher: String,
    publishedDate: String,
    description: String,
    isbn_13: String,
    isbn_10: String,
    pageCount: Number,
    printType: String,
    categories: [String],
    averageRating: Number,
    imageLink: String,
    language: String,
    copies: Number,
    availableCopies: Number,
    users: [String],
    returnDate: [Date],
    bookshelf: { type: [String], enum: ['Quito', 'Cartagena', 'Medellin', 'Digital', 'Personal_Loans']}
})

module.exports	= mongoose.model('Book', BookSchema);
