import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faTabletAlt,
  faUserTag,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ListItem = ({ url, icon, pageName }) => (
  <li className="nav-list-item">
    <NavLink to={url} exact>
      <FontAwesomeIcon icon={icon} />
      {pageName}
    </NavLink>
  </li>
);

ListItem.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  pageName: PropTypes.string.isRequired,
};


const Nav = () => (
  <nav className="sidebar">
    <div className="menu-section">
      <h2 className="nav-list-header">Main</h2>
      <ul>
        <ListItem url="/bookshelf/1" icon={faHome} pageName="Home" />
        <ListItem url="/bookshelf/Quito/1" icon={faGlobe} pageName="Quito" />
        <ListItem url="/bookshelf/Cartagena/1" icon={faGlobe} pageName="Cartagena" />
        <ListItem url="/bookshelf/Medellin/1" icon={faGlobe} pageName="Medellín" />
        <ListItem url="/bookshelf/Digital/1" icon={faTabletAlt} pageName="Digital" />
        <ListItem url="/bookshelf/Personal_Loans/1" icon={faUserTag} pageName="Personal Loans" />
      </ul>
    </div>
  </nav>
);

export default Nav;
