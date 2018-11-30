import React, { Component } from 'react';
import Book from './Book';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            books: [],
            url: this.props.url
        }
        this.searchBooks = this.searchBooks.bind(this);
    }

    //function to search books on database
    searchBooks() {
        fetch(this.props.url, {headers:{'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjMDEwOWE4OTkxMDFhNWY0Y2Q2ZTkyOCIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmIkMTAkU2dIVEZQclJITGFDMzdpME12VjZUdXdlZWx6SnY5V3lHMkUxRVJPSkpqQVBKRDBHekszLmEiLCJfX3YiOjB9LCJpYXQiOjE1NDM1OTI4MTEsImV4cCI6MTU0NDAyNDgxMX0.89OGZmv1bIW0sy6ZCQ1U-hkEyW2xc-wIZGzf77fUVKg"}})
            .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            books: result.books
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
    }

    //this function will search the books only when the component has been mounted
    componentDidMount(){
        this.searchBooks();
    }

    //this function allow us to search the books when the url has changed
    componentDidUpdate(){
        if(this.state.url != this.props.url){
            this.setState({
                url:this.props.url
            })   
            this.searchBooks();
        }  
    }

    render() {
        const { error, isLoaded, books } = this.state;

        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            
            //it returns a filtered array of books which matches the search
            let filteredBooks = books.filter((book) => {
                return book.title.toLowerCase().indexOf(this.props.filterBy.toLowerCase()) !== -1;
            });

            return (
                <div className="book-section" id="books-container">
                    {filteredBooks.map(book => (    
                        <Book book = { book } key={ book._id }/>
                    )) }
                </div>
            )
        }
    }
}

export default Books;