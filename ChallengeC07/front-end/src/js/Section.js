import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import Books from './Books';


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
                <Books url={this.props.url} filterBy={this.props.filter}/>
            </section>
        )
    }
}

export default Section;