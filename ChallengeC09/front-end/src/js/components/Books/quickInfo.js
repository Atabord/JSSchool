import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Stars from './Stars';

// This component will return the info of the book to show it in a popup

const QuickInfo = (props) => {
  const { book } = props;
  return (
    <div className="popup-container">
      <div className="book-hover">
        <div className="main-icon-container">
          <FontAwesomeIcon icon={faBookOpen} />
        </div>
        <p className="book-rate">Rate this book</p>
        <div className="hover-rate">
          <Stars rating={book.averageRating} />
        </div>
      </div>
      <div className="popup-book">
        <div className="pupup-section-container">
          <h3 className="popup-title">
            {book.title}
            {' '}
            <span className="popup-book-year">{book.publishedDate}</span>
          </h3>
          <p>
            Novel by
            <span className="popup-author">{book.authors}</span>
          </p>
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
          <Stars rating={book.averageRating} />
        </div>
        <div className="pupup-section-container">
          <Link to={`/bookshelf/book/${book._id}`} className="borrow-book">Borrow</Link>
        </div>
      </div>
    </div>
  );
};

QuickInfo.propTypes = {
  book: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default QuickInfo;
