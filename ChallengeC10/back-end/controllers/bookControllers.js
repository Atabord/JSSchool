const Book = require('../models/books');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const config = require('../config');


let PAGINATE = {
    booksPerPage : 15,
    pageNumber: 0
}

//function to get all books or all books on a bookshelf
function getAllBooks(req, res) {
    jwt.verify(req.token, config.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { search, bookShelf, page } = req.query;
            PAGINATE.pageNumber = (page - 1) || 0;
            const pagination  = {
                page: PAGINATE.pageNumber + 1,
                totalPages: 0,
            }
            // This is to find books by title and authors matching with a query
            if(search){
                const regexp = new RegExp(search, "i");
                Book.countDocuments({
                    $or: [{ title: regexp }, {authors: regexp} ]
                }, (err, count) => {
                    err ? 
                        res.status(500).send({message: `Error making the request ${err}`})
                    : pagination.totalPages = (Math.ceil(count/PAGINATE.booksPerPage));
                });
                Book.find({
                    $or: [{ title: regexp }, {authors: regexp} ]
                }, (err, books) => {
                    if (err) {
                        res.status(500).send({
                            message: `Error making the request ${err}`
                        });
                    } else if (books.length < 1) {
                        res.status(404).send({
                            message: `We don't have books that matches the request`
                        })
                    } else {
                        res.status(200).send({
                            books,
                            pagination
                        });
                    }
                })
                .limit(PAGINATE.booksPerPage)
                .skip(PAGINATE.booksPerPage * PAGINATE.pageNumber)
                .sort('title');
            } else if (bookShelf) {
                // this is to find the books depending on the bookshelf
                Book.countDocuments({
                    bookshelf: bookShelf
                }, (err, count) => {
                    err ? 
                        res.status(500).send({message: `Error making the request ${err}`})
                    : pagination.totalPages = (Math.ceil(count/PAGINATE.booksPerPage));
                });
                Book.find({
                    bookshelf: bookShelf
                }, (err, books) => {
                    if (err) {
                        res.status(500).send({
                            message: `Error making the request ${err}`
                        });
                    } else if (books.length < 1) {
                        res.status(404).send({
                            message: `We don't have books in that bookshelf right now`
                        })
                    } else {
                        res.status(200).send({
                            books,
                            pagination
                        });
                    }
                })
                .limit(PAGINATE.booksPerPage)
                .skip(PAGINATE.booksPerPage * PAGINATE.pageNumber)
                .sort('title');
            } else {
                // else, return all the books
                Book.countDocuments({}, (err, count) => {
                    err ? 
                        res.status(500).send({message: `Error making the request ${err}`})
                    : pagination.totalPages = (Math.ceil(count/PAGINATE.booksPerPage));
                });
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
                            books, 
                            pagination
                        });
                    }
                })
                .limit(PAGINATE.booksPerPage)
                .skip(PAGINATE.booksPerPage * PAGINATE.pageNumber)
                .sort('title');
            }
        }
    })
}

//function to get one book
function getOneBook(req, res) {
    jwt.verify(req.token, config.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
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
    })
}

//function to createbooks
function createBook(req, res) {
    jwt.verify(req.token, config.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const isbn = req.body.isbn;
            const place = req.body.place; //could be Quito, Cartagena, Medellín, Digital, Personal_Loans
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
    })
}

//function to lend a book
function lendBook(req, res) {
    jwt.verify(req.token, config.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
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
                    if (book.bookshelf.includes('Digital')) {
                        res.status(200).send({
                            message: `You have rented the book ${book.title}`
                        });
                    } else {
                        res.status(404).send({
                            message: `There aren't enough available books: ${book.availableCopies}`
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
    })
}


module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    lendBook
}