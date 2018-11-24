import React, { Component } from 'react';
import inUse from '../images/inUse.png';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            books: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/books")
            .then(res => res.json())
                .then(
                    (result) => {
                    this.setState({
                        isLoaded: true,
                        books: result.books
                    });
                    console.log(result.books);
                    },
                    (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    }
                )
    }

    render() {
        const { error, isLoaded, books } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                <div className="book-section" id="books-container">
                    {books.map(book => (    
                        <div className="book" key={book._id}>
                            <img src={book.imageLink} alt={book.title} className="book-main-image" />
                            <div className="in-use">
                                <img src={inUse} alt="Borrowed Book" />
                                <i className="fas fa-user-check"></i>
                            </div>
                            <div className="book-description">
                                <h3 className="book-title">{book.title}</h3>
                                <span className="book-author">{book.authors}</span>
                                {book.averageRating}
                            </div>
                            <div className="book-hover">
                                <div className="main-icon-container">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                <p className="book-rate">Rate this book</p>
                                <div className="hover-rate">
                                    {book.averageRating}
                                </div>
                            </div>
                            <div className="popup-book">
                                <div className="pupup-section-container">
                                    <h3 className="popup-title">{book.title} <span className="popup-book-year">{book.publishedDate}</span></h3>
                                    <p>Novel by <span className="popup-author">{book.authors}</span></p>
                                    <p>{book.pageCount}</p>
                                </div>
                                <div className="pupup-section-container">
                                    <h4 className="popup-section-title">Summary</h4>
                                    <p className="pupup-summary-text">
                                        {book.description}
                                    </p>
                                </div>
                                <div className="pupup-section-container">
                                    <h4 className="popup-section-title">Rating</h4>
                                    {book.averageRating}
                                </div>
                                <div className="pupup-section-container">
                                    <button className="borrow-book">Borrow</button>
                                </div>
                            </div>
                        </div>
                        
                    )) }
                </div>
            )
        }
    }
}

export default Books;