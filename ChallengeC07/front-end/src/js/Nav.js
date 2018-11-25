import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTabletAlt, faUserTag, faHome } from '@fortawesome/free-solid-svg-icons';

class ListItem extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <li className="nav-list-item">
                <button onClick={this.props.clicked} value={"http://localhost:3000/books"+this.props.url}>
                    <FontAwesomeIcon icon={this.props.icon} /> {this.props.bookshelf}
                </button>
        </li>
        )
    }
}

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: "http://localhost:3000/books"
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (event) {
        const targetUrl = event.target.value;
        this.props.changeUrl(targetUrl);
    }

    render() {
        return(
          <nav className="sidebar only-large-devices">
            <div className="menu-section">
              <h2 className="nav-list-header">Main</h2>
              <ul>
                <ListItem icon={faHome} bookshelf="Home" url="/" clicked={this.handleClick}/>
                <ListItem icon={faGlobe} bookshelf="Quito" url="?bookShelf=Quito" clicked={this.handleClick}/>
                <ListItem icon={faGlobe} bookshelf="Cartagena" url="?bookShelf=Cartagena" clicked={this.handleClick}/>
                <ListItem icon={faGlobe} bookshelf="Medellín" url="?bookShelf=Medellin" clicked={this.handleClick}/>
                <ListItem icon={faTabletAlt} bookshelf="Digital" url="?bookShelf=Digital" clicked={this.handleClick}/>
                <ListItem icon={faUserTag} bookshelf="Personal Loans" url="?bookShelf=Personal%20Loans" clicked={this.handleClick}/>                
              </ul>
            </div>
          </nav>
        );
    }
}

export default Nav;