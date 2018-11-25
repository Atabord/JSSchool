import React, { Component } from 'react';
import inUse from '../images/inUse.png';
import QuickInfo from './quickInfo';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            books: [],
            ishover: false,
            popup: false,
            hoveredBook: null,
            url: this.props.url,
            clickedBook: null
        }
        this.togglePopup = this.togglePopup.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
    }
    
    togglePopup(clickedId) {
        this.setState({
          popup: !this.state.popup,
          clickedBook: clickedId
        })
      }

    searchBooks() {
        fetch(this.props.url)
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

    componentDidMount(){
        this.searchBooks();
    }

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
            return (
                <div className="book-section" id="books-container">
                    {books.map(book => (    
                        <div className="book" key={book._id} onClick={() => this.togglePopup(book._id)}>
                            <img src={book.imageLink} alt={book.title} className="book-main-image" />
                            <div className="in-use">
                                <img src={inUse} alt="Borrowed Book" />
                                <i className="fas fa-user-check"></i>
                            </div>
                            <div className="book-description">
                                <h3 className="book-title">{book.title}</h3>
                                <span className="book-author">{book.authors}</span>
                                <span className="book-location">location: {book.bookshelf}</span>
                                {book.averageRating}
                            </div>                 
                            {this.state.popup && (this.state.clickedBook == book._id) &&
                                <QuickInfo book={book}/>                            
                            }
                        </div>
                        
                    )) }
                </div>
            )
        }
    }
}

export default Books;