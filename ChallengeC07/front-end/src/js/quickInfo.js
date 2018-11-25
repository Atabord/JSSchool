import React, { Component } from 'react';

class QuickInfo extends Component {
    render() {
        let book = this.props.book;
        return(                            
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
        )
    }
}

export default QuickInfo;