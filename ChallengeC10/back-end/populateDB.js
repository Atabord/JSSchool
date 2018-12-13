'use strict'
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');
const bookPopulator = require('./dbPopulators/bookPopulator');
const userPopulator = require('./dbPopulators/userPopulator');

const books = [
        {
            body: {
                isbn: '9780143127550',
                place: ['Quito', 'Medellin'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9781476770390',
                place: ['Quito'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9781501173219',
                place: ['Cartagena', 'Quito'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780547928210',
                place: ['Cartagena', 'Quito'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780156012195',
                place: ['Cartagena'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780439064866',
                place: ['Medellin'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780596517748',
                place: ['Digital'],
                copies: 0
            }
        },
        {
            body: {
                isbn: '9780618640157',
                place: ['Medellin'],
                copies: 4
            }
        },
        {
            body: {
                isbn: '9780439136358',
                place: ['Digital'],
                copies: 0
            }
        },
        {
            body: {
                isbn: '9780547928227',
                place: ['Digital'],
                copies: 0
            }
        },
        {
            body: {
                isbn: '9780060598242',
                place: ['Personal_Loans'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780307276667',
                place: ['Quito'],
                copies: 3
            }
        },
        {
            body: {
                isbn: '9780590353403',
                place: ['Quito', 'Medellin'],
                copies: 4
            }
        },
        {
            body: {
                isbn: '9780439139595',
                place: ['Cartagena', 'Medellin'],
                copies: 2
            }
        },
        {
            body: {
                isbn: '9780439358064',
                place: ['Cartagena', 'Quito'],
                copies: 2
            }
        },
        {
            body: {
                isbn: '9780439785969',
                place: ['Digital'],
                copies: 0
            }
        },
        {
            body: {
                isbn: '9780201633610',
                place: ['Digital'],
                copies: 0
            }
        },
    ]

const users = [
    {
        body: {
            email: 'user1@example.com',
            username: 'user1',
            password: 'password1',
        },
    },
    {
        body: {
            email: 'user2@example.com',
            username: 'user2',
            password: 'password2',
        }
    }
];

// function poblator(array){

// }


mongoose.connect(config.db, (err, res) => {
    if(err) {
        throw console.log(`error to connect with database ${err}`);
    } else {
        console.log('Database connection established');

        const userPromises = users.map((user) => {
            const poblate = new Promise((resolve, reject) => {
                userPopulator.signUp(user, resolve, reject);
            })
            return poblate;
        });

        const bookPromises = books.map((book)=> {
            let poblate = new Promise((resolve, reject) => {               
                bookPopulator.createMultipleBooks(book, resolve, reject);        
            });
            return poblate;
        });

        let promises = [...userPromises, ...bookPromises];

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