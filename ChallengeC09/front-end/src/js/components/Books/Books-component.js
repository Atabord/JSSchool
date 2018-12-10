import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Book from './Book';

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
    const { books, isLoaded, error } = this.props;

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
      <div className="book-section" id="books-container">
        {books.map(book => (
          <Book book={book} key={book._id} />
        )) }
        <div className="pagination-container">
          {this.getPagination()}
        </div>
      </div>
    );
  }
}

export default Books;
