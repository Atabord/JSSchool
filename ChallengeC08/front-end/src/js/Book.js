import React, { Component } from 'react';
import inUse from '../images/inUse.png';
import QuickInfo from './quickInfo';
import Stars from './Stars';

class Book extends Component {
    constructor() {
        super();
        this.state = {
            popup: false,
            clickedBook: null
        }
        this.togglePopup = this.togglePopup.bind(this);
    }

    //function to handle show and hide of popup
    togglePopup(clickedId) {
        this.setState({
            popup: !this.state.popup,
            clickedBook: clickedId
        })
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book" key={book._id} onClick={() => this.togglePopup(book._id)}>
                <img src={book.imageLink} alt={book.title} className="book-main-image" />
                <div className="in-use">
                    <img src={inUse} alt="Borrowed Book" />
                    <i className="fas fa-user-check"></i>
                </div>
                <div className="book-description">
                    <h3 className="book-title">{book.title}</h3>
                    <span className="book-author">{book.authors.join(", ")}</span>
                    <span className="book-location">{book.bookshelf.join(", ")}</span>
                    <Stars rating={book.averageRating} />
                </div>                 
                {this.state.popup && (this.state.clickedBook == book._id) &&
                    <QuickInfo book={book}/>                            
                }
            </div>
        )
    }
}

export default Book;