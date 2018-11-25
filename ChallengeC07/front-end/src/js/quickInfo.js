import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

class QuickInfo extends Component {
    render() {
        let book = this.props.book;
        return( 
            <div className="popup-container">
                <div className="book-hover">
                    <div className="main-icon-container">
                        <FontAwesomeIcon icon={faBookOpen} />
                    </div>
                    <p className="book-rate">Rate this book</p>
                    <div className="hover-rate">
                        {book.averageRating}
                    </div>
                </div>
                <div className="popup-book">
                    <div className="pupup-section-container">
                        <h3 className="popup-title">{book.title} <span className="popup-book-year">{book.publishedDate}</span></h3>
                        <p>Novel by <span className="popup-author">{book.authors}</span></p>
                        <p>{book.pageCount}</p>
                    </div>
                    <div className="pupup-section-container">
                        <h4 className="popup-section-title">Summary</h4>
                        <p className="pupup-summary-text">
                            {book.description}
                        </p>
                    </div>
                    <div className="pupup-section-container">
                        <h4 className="popup-section-title">Rating</h4>
                        {book.averageRating}
                    </div>
                    <div className="pupup-section-container">
                        <button className="borrow-book">Borrow</button>
                    </div>
                </div>
            </div>                          
        )
    }
}

export default QuickInfo;