import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Book from './Book';
import styles from './styles';

// this component returns a page with all the books requested
class Books extends Component {
  // this function will search the books only when the component has been mounted
  componentDidMount() {
    const { url, searchBook } = this.props;
    searchBook(url);
  }

  // this function allow us to search the books when the url has changed
  componentDidUpdate(prevProps) {
    const { url, searchBook } = this.props;
    if (url !== prevProps.url) {
      searchBook(url);
    }
  }

  // this function obtain the total pages and make links with that number of pages
  getPagination() {
    const { pagination, path } = this.props;
    const { totalPages } = pagination;
    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(<NavLink to={`${path}/${i}`} key={`page ${i}`}>{i}</NavLink>);
    }
    return buttons;
  }

  render() {
    const { books, isLoaded, error, classes } = this.props;

    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    } if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div className={classes.bookSection} id="books-container">
        {books.map(book => (
          <Book book={book} key={book._id} />
        )) }
        <div className={classes.paginationContainer}>
          {this.getPagination()}
        </div>
      </div>
    );
  }
}

Books.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  searchBook: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};


export default injectSheet(styles)(Books);
