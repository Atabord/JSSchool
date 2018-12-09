import React, { Component } from 'react';
import inUse from '../images/inUse.png';
import QuickInfo from './components/quickInfo';
import Stars from './components/Stars';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      popup: false,
      clickedBook: null,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  // function to handle show and hide of popup
  togglePopup(clickedId) {
    const { popup } = this.state;
    this.setState({
      popup: !popup,
      clickedBook: clickedId,
    });
  }

  render() {
    const { book } = this.props;
    const { popup, clickedBook } = this.state;
    return (
      <div className="book" key={book._id} onClick={() => this.togglePopup(book._id)}>
        <img src={book.imageLink} alt={book.title} className="book-main-image" />
        <div className="in-use">
          <img src={inUse} alt="Borrowed Book" />
          <i className="fas fa-user-check" />
        </div>
        <div className="book-description">
          <h3 className="book-title">{book.title}</h3>
          <span className="book-author">{book.authors.join(', ')}</span>
          <span className="book-location">{book.bookshelf.join(', ')}</span>
          <Stars rating={book.averageRating} />
        </div>
        {popup && (clickedBook === book._id)
                    && <QuickInfo book={book} />
                }
      </div>
    );
  }
}

export default Book;
