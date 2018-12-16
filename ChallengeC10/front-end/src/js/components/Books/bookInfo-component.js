import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import injectSheet from 'react-jss';
import Stars from './Stars';
import styles from './styles';
import 'react-datepicker/dist/react-datepicker.css';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addDays"] }] */
// this component returns the information of just one book finding it by Id
class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDate: this.addDays(15),
      returnDate: new Date(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  // this function will search the book only when the component has been mounted
  componentDidMount() {
    const { url, searchBook } = this.props;
    searchBook(url);
  }

  // this function allow us to search the book when the url has changed
  componentDidUpdate(prevProps) {
    const { url, searchBook } = this.props;
    if (url !== prevProps.url) {
      searchBook(url);
    }
  }

  // function to handle change on datepicker
  handleDateChange(date) {
    const { maxDate } = this.state;
    if (date <= maxDate) {
      this.setState({
        returnDate: date,
      });
    } else {
      this.setState({
        returnDate: maxDate,
      });
    }
  }

  // function to handle submit of lend to the database
  handleSubmit(event) {
    event.preventDefault();
    const { searchBook, book, username } = this.props;
    const { returnDate } = this.state;
    const data = { returnDate, username };
    console.log(data);
    searchBook(`/${book._id}/lend`, 'PATCH', data);
  }

  // function to limit the date of return the book
  addDays(maxDays) {
    const d = new Date();
    d.setDate(d.getDate() + maxDays);
    return d;
  }

  render() {
    const {
      error,
      isLoaded,
      book,
      message,
      classes,
    } = this.props;
    const { returnDate, maxDate } = this.state;

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
        {Object.keys(book).length
        && (
          <Fragment>
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
              {book.availableCopies || book.bookshelf.includes('Digital')
                ? (
                  <Fragment>
                    {message && (
                      <div className={classes.alert}>
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
                        maxDate={maxDate}
                      />
                      <button type="submit">Borrow</button>
                    </form>
                  </Fragment>
                )
                : <p>There are not available copies now</p>
              }
          </Fragment>
        )
        }
      </div>
    );
  }
}

export default injectSheet(styles)(BookInfo);
