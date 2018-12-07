import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTabletAlt, faUserTag, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

class ListItem extends Component {

    render() {
        return(
            <li className="nav-list-item">
                <NavLink to={this.props.url} exact>
                    <FontAwesomeIcon icon={this.props.icon}/>
                    {this.props.pageName}
                </NavLink>
            </li>
        )
    }
}

class Nav extends Component {

    render() {
        return(
          <nav className="sidebar">
            <div className="menu-section">
              <h2 className="nav-list-header">Main</h2>
              <ul>
                  <ListItem url='/bookshelf/1' icon={faHome} pageName='Home' />
                  <ListItem url='/bookshelf/Quito/1' icon={faGlobe} pageName='Quito' />
                  <ListItem url='/bookshelf/Cartagena/1' icon={faGlobe} pageName='Cartagena' />
                  <ListItem url='/bookshelf/Medellin/1' icon={faGlobe} pageName='Medellín' />
                  <ListItem url='/bookshelf/Digital/1' icon={faTabletAlt} pageName='Digital' />
                  <ListItem url='/bookshelf/Personal_Loans/1' icon={faUserTag} pageName='Personal Loans' />                  
                </ul>
            </div>
          </nav>
        );
    }
}

export default Nav;