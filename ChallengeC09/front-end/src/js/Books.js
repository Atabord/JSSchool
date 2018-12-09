import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Book from './Book';
import searchBook from './actions/actions-books';

// this component returns a page with all the books requested
class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: [],
      pagination: {},
      url: this.props.url,
    };
  }

  // this function will search the books only when the component has been mounted
  componentDidMount() {
    const { searchBook } = this.props;
    const { url } = this.state;
    searchBook(url);
  }

  // this function allow us to search the books when the url has changed
  componentDidUpdate() {
    const { url } = this.state;
    if (url !== this.props.url) {
      this.setState({
        url: this.props.url,
      });
      this.searchBooks();
    }
  }

  // this function obtain the total pages and make links with that number of pages
  getPagination() {
    const { books, path } = this.props;
    const { pagination } = books;
    const { totalPages } = pagination;
    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(<NavLink to={`${path}/${i}`} key={`page ${i}`}>{i}</NavLink>);
    }
    return buttons;
  }

  render() {
    const { books, isLoaded, error } = this.props;
    console.log(books.books);
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
        {books.books.map(book => (
          <Book book={book} key={book._id} />
        )) }
        <div className="pagination-container">
          {this.getPagination()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    error,
    isLoaded,
    books,
    pagination,
    url,
  } = state.books;

  return {
    error,
    isLoaded,
    books,
    pagination,
    url,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);
