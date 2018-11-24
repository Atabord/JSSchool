import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTabletAlt, faUserTag } from '@fortawesome/free-solid-svg-icons';


class Nav extends Component {
    render() {
        return(
          <nav className="sidebar only-large-devices">
            <div className="menu-section">
              <h2 className="nav-list-header">Main</h2>
              <ul>
                <li className="nav-list-item">
                    <a href="#">
                        <FontAwesomeIcon icon={faGlobe} /> Quito
                    </a>
                </li>
                <li className="nav-list-item">
                    <a href="#">
                        <FontAwesomeIcon icon={faGlobe} /> Cartagena
                    </a>
                </li>
                <li className="nav-list-item">
                    <a href="#">
                        <FontAwesomeIcon icon={faGlobe} /> Medellín
                    </a>
                </li>
                <li className="nav-list-item">
                    <a href="#">
                        <FontAwesomeIcon icon={faTabletAlt} /> Digital
                    </a>
                </li>
                <li className="nav-list-item">
                    <a href="#">
                        <FontAwesomeIcon icon={faUserTag} /> Personal Loans
                    </a>
                </li>
              </ul>
            </div>
          </nav>
        );
    }
}

export default Nav;