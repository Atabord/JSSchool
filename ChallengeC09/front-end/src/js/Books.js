import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Book from './Book';

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
    this.searchBooks = this.searchBooks.bind(this);
  }

  // this function will search the books only when the component has been mounted
  componentDidMount() {
    this.searchBooks();
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
    const { pagination } = this.state;
    const { totalPages } = pagination;
    const { path } = this.props;
    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(<NavLink to={`${path}/${i}`} key={`page ${i}`}>{i}</NavLink>);
    }
    return buttons;
  }


  // function to search books on database
  searchBooks() {
    const { url } = this.props;
    const { handleLog, notFound } = this.props;
    fetch(url, { headers: { Authorization: sessionStorage.getItem('token') } })
      .then((res) => {
        if (res.status === 403) {
          handleLog(false);
        } else if (res.status === 404) {
          notFound(true);
        } else {
          notFound(false);
          return res.json();
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            books: result.books,
            pagination: result.pagination,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    const { error, isLoaded, books } = this.state;
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
