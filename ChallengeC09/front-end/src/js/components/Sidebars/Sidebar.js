import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './sidebarStyles';

const Sidebar = ({ classes }) => (
  <aside className={`sidebar ${classes.sidebarAside}`}>
    <h2>Most Read Books</h2>
    <ol>
      <li><a href="/">Hooked: How to Build Habit-Forming Products</a></li>
      <li><a href="/">The inevitable: Understanding the 12 Technological Forces That Will Shape Our Future</a></li>
      <li><a href="/">Lean In: Women, Work, and the Will to Lead</a></li>
      <li><a href="/">Building a Business When There Are No Easy Answers</a></li>
      <li><a href="/">How Google Works</a></li>
    </ol>
  </aside>
);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(Sidebar);
