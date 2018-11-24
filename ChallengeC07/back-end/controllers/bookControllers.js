const Book = require('../models/books');
const fetch = require('node-fetch');

//function to get all books or all books on a bookshelf
function getAllBooks(req, res) {
    const bookShelf = req.query.bookShelf;
    if (bookShelf) {
        Book.find({
            bookshelf: bookShelf
        }, (err, books) => {
            if (err) {
                res.status(500).send({
                    message: `Error making the request ${err}`
                });
            } else if (!books) {
                res.status(404).send({
                    message: `We don't have books in that bookshelf right now`
                })
            } else {
                res.status(200).send({
                    books
                });
            }
        })
    } else {
        Book.find({}, (err, books) => {
            if (err) {
                res.status(500).send({
                    message: `Error making the request ${err}`
                });
            } else if (!books) {
                res.status(404).send({
                    message: `We don't have books right now`
                })
            } else {
                res.status(200).send({
                    books
                });
            }
        })
    }
}

//function to get one book
function getOneBook(req, res) {
    let bookId = req.params.book;
    Book.findById(bookId, (err, book) => {
        if (err) {
            res.status(500).send({
                message: `Error making the request ${err}`
            });
        } else if (!book) {
            res.status(404).send({
                message: `That book doesn't exist`
            })
        } else {
            res.status(200).send({
                book
            })
        }
    });
}

//function to createbooks
function createBook(req, res) {
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
                    res.status(500)
                        .send({
                            message: `Error saving the book ${err}`
                        });
                } else {
                    res.status(200)
                        .send({
                            book: bookStored
                        });
                }
            })
        } catch (err) {
            res.status(500)
                .send({
                    message: `Error making the request try with another isbn number`
                });
        }
    }
    getBook(url);
}

//function to lend a book
function lendBook(req, res) {
    let bookId = req.params.book;
    Book.findById(bookId, (err, book) => {
        if (err) {
            res.status(500).send({
                message: `Error making the request ${err}`
            });
        } else if (!book) {
            res.status(404).send({
                message: `That book doesn't exist`
            });
        } else if (book.availableCopies <= 0) {
            if (book.bookshelf === 'Digital') {
                res.status(200).send({
                    message: `You have rented the book ${book.title}`
                });
            } else {
                res.status(404).send({
                    message: `There aren't enought available books: ${book.availableCopies}`
                });
            }
        } else {
            // just rent them if there are available books
            Book.findOneAndUpdate({
                _id: bookId
            }, {
                $inc: {
                    availableCopies: -1
                }
            }, (err, bookUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: `Error making the request ${err}`
                    });
                } else {
                    res.status(200).send({
                        message: `You have rented the book ${bookUpdated.title}`
                    });
                }
            });
        }
    });
}

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
            reject(`Error making the request, try with another isbn number`);            
        }
    }
    getBook(url);
}


module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    lendBook,
    createMultipleBooks
}