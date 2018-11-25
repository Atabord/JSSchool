import React, { Component } from 'react';
import inUse from '../images/inUse.png';
import QuickInfo from './quickInfo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

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
        this.handleHover = this.handleHover.bind(this);
        this.handleUnhover = this.handleUnhover.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
    }

    handleHover(hoverId) {
        this.setState({
          ishover: true,
          hoveredBook: hoverId
        })
      }

    handleUnhover() {
        this.setState({
            ishover: false
        })
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
                        <div className="book" key={book._id} onClick={() => this.togglePopup(book._id)} onMouseEnter={() => this.handleHover(book._id)} onMouseLeave={this.handleUnhover}>
                            <img src={book.imageLink} alt={book.title} className="book-main-image" />
                            <div className="in-use">
                                <img src={inUse} alt="Borrowed Book" />
                                <i className="fas fa-user-check"></i>
                            </div>
                            <div className="book-description">
                                <h3 className="book-title">{book.title}</h3>
                                <span className="book-author">{book.authors}</span>
                                {book.averageRating}
                            </div>                 
                            {this.state.ishover && (this.state.hoveredBook == book._id) &&
                                <div className="book-hover">
                                    <div className="main-icon-container">
                                        <FontAwesomeIcon icon={faBookOpen} />
                                    </div>
                                    <p className="book-rate">Rate this book</p>
                                    <div className="hover-rate">
                                        {book.averageRating}
                                    </div>
                                </div>
                            }           
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