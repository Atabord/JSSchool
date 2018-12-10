import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import styles from './styles';
import Stars from './Stars';

// This component will return the info of the book to show it in a popup

const QuickInfo = ({ book, classes }) => (
  <div className={classes.popupContainer}>
    <div className={classes.bookHover}>
      <div className={classes.mainIconContainer}>
        <FontAwesomeIcon icon={faBookOpen} />
      </div>
      <p className={classes.bookRate}>Rate this book</p>
      <div className={classes.hoverRate}>
        <Stars rating={book.averageRating} />
      </div>
    </div>
    <div className={classes.popupBook}>
      <div className={classes.pupupSectionContainer}>
        <h3 className={classes.popupTitle}>
          {book.title}
          {' '}
          <span className={classes.popupBookYear}>{book.publishedDate}</span>
        </h3>
        <p>
          Novel by
          <span className={classes.popupAuthor}>{book.authors}</span>
        </p>
        <p>{book.pageCount}</p>
      </div>
      <div className={classes.pupupSectionContainer}>
        <h4 className={classes.popupSectionTitle}>Summary</h4>
        <p className={classes.pupupSummaryText}>
          {book.description}
        </p>
      </div>
      <div className={classes.pupupSectionContainer}>
        <h4 className={classes.popupSectionTitle}>Rating</h4>
        <Stars rating={book.averageRating} />
      </div>
      <div className={classes.pupupSectionContainer}>
        <Link to={`/bookshelf/book/${book._id}`} className={classes.borrowBook}>Borrow</Link>
      </div>
    </div>
  </div>
);

QuickInfo.propTypes = {
  book: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(QuickInfo);
