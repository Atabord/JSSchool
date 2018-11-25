'use strict'
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');
const bookControllers = require('./controllers/bookControllers');

const books = [
        {
            body: {
                isbn: '9780143127550',
                place: 'Quito',
                copies: 3
            }
        },
        {
            body: {
                isbn: '9781476770390',
                place: 'Quito',
                copies: 3
            }
        },
        {
            body: {
                isbn: '9781501173219',
                place: 'Cartagena',
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780156012195',
                place: 'Cartagena',
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780439064866',
                place: 'Medellin',
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780618640157',
                place: 'Medellin',
                copies: 4
            }
        },
        {
            body: {
                isbn: '9780439136358',
                place: 'Digital',
                copies: 0
            }
        },
        {
            body: {
                isbn: '9780547928227',
                place: 'Digital',
                copies: 0
            }
        },
        {
            body: {
                isbn: '9780060598242',
                place: 'Personal Loans',
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780307276667',
                place: 'Quito',
                copies: 3
            }
        },
    ]

mongoose.connect(config.db, (err, res) => {
    if(err) {
        throw console.log(`error to connect with database ${err}`);
    } else {
        console.log('Database connection established');

        let promises = books.map((book)=> {
            let poblate = new Promise((resolve, reject) => {               
                bookControllers.createMultipleBooks(book, resolve, reject);        
            });
            return poblate
        })

        Promise.all(promises).then(resolve => {
            resolve.map(res => {
                console.log(res);
            })
            console.log('Database populated!');
            
            mongoose.disconnect();
        })
        .catch(res => {            
            console.log(res);
            mongoose.disconnect();
        });
    }
});