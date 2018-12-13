import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import jakob from '../../../images/profile.png';
import mainLogo from '../../../images/logo-jobsity.png';
import styles from './styles';

// this component returns a page with all the elements on the header
class Header extends Component {
  constructor(props) {
    super(props);
    this.submitSearch = this.submitSearch.bind(this);
  }

  // function to submit the search and redirect to its specific page
  submitSearch(event) {
    event.preventDefault();
    const { history, searchVal } = this.props;
    history.push(`/bookshelf/search/${searchVal}`);
  }

  render() {
    const { searchVal, handleChange, classes } = this.props;
    return (
      <header className={classes.header}>
        <div className={classes.logoHeader}>
          <img id="logo" src={mainLogo} alt="Jobsity Logo" />
        </div>
        <div className={`${classes.mainHeader} hide-on-small`}>
          <h1 className="">Bookshelf</h1>
          <form className="only-large-devices" onSubmit={this.submitSearch}>
            <div className={classes.formSearch}>
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="search"
                name="search"
                placeholder="Search..."
                value={searchVal}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className={`${classes.profileHeader} only-large-devices`}>
          <div className={classes.dropdownMenu}>
            <button type="button" name="button" className={classes.dropdownButton}>
              Jakob Treml
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <div className={classes.dropdownList}>
              <ul>
                <li><a href="/">Profile</a></li>
                <li><a href="/">Help</a></li>
                <li><a href="/">Logout</a></li>
              </ul>
            </div>
            <img src={jakob} alt="Profile" className={classes.jakob} />
          </div>
        </div>
        <div className={classes.smallDevicesNavbar}>
          <div className="button-container">
            <button type="button" name="button" className="navbar-toggler">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="navbar-collapse">
            <h1 className={classes.onlyOnSmall}>Bookshelf</h1>
            <form className="" action="index.html" method="post">
              <div className="form-search">
                <FontAwesomeIcon icon={faSearch} />
                <input type="search" placeholder="Search..." className="" />
              </div>
            </form>
            <div className="dropdown-collapse">
              <button type="button" name="button" className="collapse-button">
                <img src={jakob} alt="Profile" className={classes.jakob} />
                <span>
                  Jakob Treml
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </button>
              <div className="dropdown-collapse-list">
                <ul>
                  <li><a href="/">Profile</a></li>
                  <li><a href="/">Help</a></li>
                  <li><a href="/">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(withRouter(Header));
