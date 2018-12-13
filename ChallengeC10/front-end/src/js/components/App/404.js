import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './notFoundStyles';

// This component will return a 404 page
const NotFound = ({ classes }) => (
  <div className={classes.notFoundContainer}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      The page you are trying to access doesn’t exist,
      please try with another page or visit our homepage
    </p>
    <Link to="/">Homepage</Link>
  </div>
);

NotFound.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(NotFound);
