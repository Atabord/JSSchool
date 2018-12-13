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
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Set the wrapper ref
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // function to handle show and hide of popup
  togglePopup(clickedId) {
    const { popup } = this.state;
    this.setState({
      popup: !popup,
      clickedBook: clickedId,
    });
  }

  // Function to handle click outside div and close its popup.
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        popup: false,
        clickedBook: null,
      });
    }
  }

  render() {
    const { book, classes } = this.props;
    const { popup, clickedBook } = this.state;
    return (
      <div 
        className={`${classes.book} book`} 
        key={book._id} 
        ref={this.setWrapperRef}
        onClick={() => this.togglePopup(book._id)}
        >
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

Book.defaultProps = {
  book: {},
};

Book.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  book: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(Book);
