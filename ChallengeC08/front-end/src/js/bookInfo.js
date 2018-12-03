import React, { Component } from 'react';
import Stars from './Stars';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class BookInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            books: null,
            url: this.props.url, 
            returnDate: new Date()
        }
        this.searchBook = this.searchBook.bind(this);
    };

    handleDateChange(date){
        this.setState({
            returnDate: date
        });
    };

    handleSubmit(event) {
        event.preventDefault();
    }

    searchBook() {
        let { url } = this.props;
        fetch(url, {headers:{'Authorization': sessionStorage.getItem("token")}})
            .then(res => {
                if(res.status === 403){
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
                            book: result.book
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                );
    };

    //this function will search the books only when the component has been mounted
    componentDidMount(){
        this.searchBook();
    };

    //this function allow us to search the books when the url has changed
    componentDidUpdate(){
        let {url} = this.state;
        if(url != this.props.url){
            this.setState({
                url:this.props.url
            })   
            this.searchBook();
        } ;
    };

    addDays(maxDate) {
        var d = new Date();
        d.setDate(d.getDate() + maxDate);
        return d;
    }

    render() {
        const { error, isLoaded, book } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return(
                <div>
                    <h3>{book.title}</h3>
                    <Stars rating={book.averageRating} />
                    <img src={book.imageLink} alt={book.title} />
                    <p className="">Author(s): {book.authors.join(", ")}</p>
                    <p className="">Location(s): {book.bookshelf.join(", ")}</p>
                    <p className="">Category(ies): {book.categories.join(", ")}</p>
                    <p className="">Publisher: {book.publisher}</p>
                    <p className="">Published Date: {book.publishedDate}</p>
                    <p className="">Pages: {book.pageCount}</p>
                    <p className="">Description: {book.description}</p>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Borrow this book</h3>

                        <DatePicker 
                            selected={this.state.returnDate} 
                            onChange={this.handleChange} 
                            minDate={new Date()}
                            maxDate={this.addDays(15)}
                            placeholderText="Select the return date (max 15 days)"
                            />

                        <button>Borrow</button>
                    </form>
                </div>
            );
        };
    };
};

export default BookInfo;