import React, { Component } from 'react';
import Book from './Book';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            books: [],
            pagination: {},
            isLogged: this.props.logged,
            url: this.props.url
        }
        this.searchBooks = this.searchBooks.bind(this);
    }

    //function to search books on database
    searchBooks() {
        fetch(this.props.url, {headers:{'Authorization': sessionStorage.getItem("token")}})
            .then(res => {
                if(res.status === 403){
                    this.props.handleLog(false);
                } else {
                    return res.json()
                }           
            })
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            books: result.books,
                            pagination: result.pagination
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

    getPagination(){
        const { totalPages } = this.state.pagination;
        let buttons = []
        for (let i = 1; i <= totalPages; i++) {            
            buttons.push(<button key={`page ${i}`}>{i}</button>)
            console.log(i);
        }
        return buttons;
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
                    <div className="pagination-container">
                        {this.getPagination()}
                    </div>
                </div>
            )
        }
    }
}

export default Books;