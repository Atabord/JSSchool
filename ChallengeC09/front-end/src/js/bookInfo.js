import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Stars from './components/Stars';

import 'react-datepicker/dist/react-datepicker.css';

// this component returns the information of just one book finding it by Id
class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      message: '',
      book: null,
      url: this.props.url,
      returnDate: new Date(),
    };
    this.searchBook = this.searchBook.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  // this function will search the book only when the component has been mounted
  componentDidMount() {
    this.searchBook();
  }

  // this function allow us to search the book when the url has changed
  componentDidUpdate() {
    const { url } = this.state;
    if (url != this.props.url) {
      this.setState({
        url: this.props.url,
      });
      this.searchBook();
    }
  }

  // function to handle change on datepicker
  handleDateChange(date) {
    this.setState({
      returnDate: date,
    });
  }

  // function to show message after lending a book
  handleMessage(message) {
    this.setState({
      message,
    });
  }

  // function to handle submit of lend to the database
  handleSubmit(event) {
    event.preventDefault();
    const { book } = this.state;
    const options = {
      method: 'PATCH',
      headers: { Authorization: sessionStorage.getItem('token') },
    };
    const { handleLog, notFound } = this.props;
    fetch(`${process.env.HOME}/${book._id}/lend`, options)
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
      .then((result) => {
        result
          ? this.handleMessage(result.message)
          : this.handleMessage('There are not available books now');
      }, (err) => {
        this.handleMessage(err);
      });
  }

  // function to search information of just one book
  searchBook() {
    const { url } = this.props;
    fetch(url, { headers: { Authorization: sessionStorage.getItem('token') } })
      .then((res) => {
        if (res.status === 403) {
          this.props.handleLog(false);
        } else if (res.status === 404) {
          this.props.notFound(true);
        } else {
          this.props.notFound(false);
          return res.json();
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            book: result.book,
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

  // function to limit the date of return the book
  addDays(maxDate) {
    const d = new Date();
    d.setDate(d.getDate() + maxDate);
    return d;
  }

  render() {
    const { error, isLoaded, book, message, returnDate } = this.state;
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
      <div>
        <h3>{book.title}</h3>
        <Stars rating={book.averageRating} />
        <img src={book.imageLink} alt={book.title} />
        <p>
          Author(s):
          {book.authors.join(', ')}
        </p>
        <p>
          Location(s):
          {book.bookshelf.join(', ')}
        </p>
        <p>
          Available Copies:
          {book.availableCopies}
        </p>
        <p>
          Category(ies):
          {book.categories.join(', ')}
        </p>
        <p>
          Publisher:
          {book.publisher}
        </p>
        <p>
          Published Date:
          {book.publishedDate}
        </p>
        <p>
          Pages:
          {book.pageCount}
        </p>
        <p>
          Description:
          {book.description}
        </p>
        <h3>Borrow this book</h3>
        {message && (
          <div className="alert">
            <p>
              {message}
            </p>
          </div>
        )
        }
        <form onSubmit={this.handleSubmit}>
          <p>Select a date for the returning date</p>
          <DatePicker
            selected={returnDate}
            onChange={this.handleDateChange}
            minDate={new Date()}
            maxDate={this.addDays(15)}
          />
          <button type="submit">Borrow</button>
        </form>
      </div>
    );
  }
}

export default BookInfo;
