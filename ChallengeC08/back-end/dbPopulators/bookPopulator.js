const Book = require('../models/books');
const fetch = require('node-fetch');

// this function receibe resolve and reject instead of just response
function createMultipleBooks(req, resolve, reject) {
    const isbn = req.body.isbn;
    const place = req.body.place; //could be Quito, Cartagena, Medellín, Digital, Personal Loans
    const copies = req.body.copies; //number of copies
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`

    // saving the book information of place, copies and availables
    let book = new Book();
    book.bookshelf = place;
    book.copies = copies;
    book.availableCopies = copies; // its default is the number of copies

    // function to get the book information from google Api
    async function getBook(url) {
        try {
            const content = await fetch(url)
                .then(async res => res.json());
            book.title = content.items[0].volumeInfo.title;
            book.authors = content.items[0].volumeInfo.authors;
            book.publisher = content.items[0].volumeInfo.publisher;
            book.publishedDate = content.items[0].volumeInfo.publishedDate;
            book.description = content.items[0].volumeInfo.description;
            book.isbn_13 = content.items[0].volumeInfo.industryIdentifiers[0].identifier;
            book.isbn_10 = content.items[0].volumeInfo.industryIdentifiers[1].identifier;
            book.pageCount = content.items[0].volumeInfo.pageCount;
            book.printType = content.items[0].volumeInfo.printType;
            book.categories = content.items[0].volumeInfo.categories;
            book.averageRating = content.items[0].volumeInfo.averageRating;
            book.imageLink = content.items[0].volumeInfo.imageLinks.thumbnail;
            book.language = content.items[0].volumeInfo.language;

            book.save((err, bookStored) => {
                if (err) {
                    reject(`Error saving the book ${bookStored.title}`);                    
                } else {
                    resolve(`'${bookStored.title}' saved`);                     
                }
            })
        } catch (err) {
            reject(`Error making the request, try with another isbn number:
             ${err}`);
        }
    }
    getBook(url);
}

module.exports = {
    createMultipleBooks
}