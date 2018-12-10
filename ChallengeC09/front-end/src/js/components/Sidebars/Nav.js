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
import injectSheet from 'react-jss';
import styles from './navStyles';

const ListItem = ({
  classes, url, icon, pageName,
}) => (
  <li className={classes.navListItem}>
    <NavLink to={url} exact>
      <FontAwesomeIcon icon={icon} />
      {pageName}
    </NavLink>
  </li>
);

const StyledListItem = injectSheet(styles)(ListItem);

ListItem.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  pageName: PropTypes.string.isRequired,
};

const Nav = ({ classes }) => (
  <nav className={`sidebar ${classes.nav}`}>
    <div className={classes.menuSection}>
      <h2 className={classes.navListHeader}>Main</h2>
      <ul>
        <StyledListItem url="/bookshelf/1" icon={faHome} pageName="Home" />
        <StyledListItem url="/bookshelf/Quito/1" icon={faGlobe} pageName="Quito" />
        <StyledListItem url="/bookshelf/Cartagena/1" icon={faGlobe} pageName="Cartagena" />
        <StyledListItem url="/bookshelf/Medellin/1" icon={faGlobe} pageName="Medellín" />
        <StyledListItem url="/bookshelf/Digital/1" icon={faTabletAlt} pageName="Digital" />
        <StyledListItem url="/bookshelf/Personal_Loans/1" icon={faUserTag} pageName="Personal Loans" />
      </ul>
    </div>
  </nav>
);

Nav.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(Nav);
