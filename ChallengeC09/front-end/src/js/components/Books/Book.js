import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import inUse from '../../../images/inUse.png';
import QuickInfo from './quickInfo';
import Stars from './Stars';

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
    const { book, classes } = this.props;
    const { popup, clickedBook } = this.state;
    return (
      <div className={`${classes.book} book`} key={book._id} onClick={() => this.togglePopup(book._id)}>
        <img src={book.imageLink} alt={book.title} className={classes.bookMainImage} />
        <div className={classes.inUse}>
          <img src={inUse} alt="Borrowed Book" />
          <FontAwesomeIcon icon={faUserCheck} />
        </div>
        <div className={classes.bookDescription}>
          <h3 className={classes.bookTitle}>{book.title}</h3>
          <span className={classes.bookAuthor}>{book.authors.join(', ')}</span>
          <span className={classes.bookLocation}>{book.bookshelf.join(', ')}</span>
          <Stars rating={book.averageRating} />
        </div>
        {popup && (clickedBook === book._id)
          && <QuickInfo book={book} />
        }
      </div>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(Book);
