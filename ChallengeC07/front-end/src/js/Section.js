import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';


class Section extends Component {
    render() {
        return(
            <section>
            <div className="section-header">
              <h2>New Releases</h2>
              <div className="list-icons">
                <a href="#">
                    <FontAwesomeIcon icon={faThLarge} />
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faThList} />
                </a>
              </div>
            </div>
            <div className="book-section" id="books-container">
            </div>
          </section>
        )
    }
}

export default Section;