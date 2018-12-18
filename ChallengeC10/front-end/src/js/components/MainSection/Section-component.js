import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Books from '../../containers/Books';
import BookInfo from '../../containers/bookInfo';
import NotFound from '../App/404';
import styles from './styles';

// this component will return the main section of the page depending on its route
class Section extends Component {
  constructor() {
    super();
    this.state = {
      contentTitle: 'Home',
      pages: ['/Quito', '/Medellin', '/Cartagena', '/Digital', '/Personal_Loans'],
    };
    this.createRedirects = this.createRedirects.bind(this);
    this.createRoutes = this.createRoutes.bind(this);
  }

  // this is to redirect every /bookshelf to its specific first page, when paginating
  createRedirects() {
    const { pages } = this.state;
    const routes = [];
    pages.map((page) => {
      routes.push(<Route
        path={`/bookshelf${page}`}
        exact
        key={`/bookshelf${page}`}
        render={
          () => (<Redirect to={`/bookshelf${page}/1`} />)
        }
      />);
    });
    return routes;
  }

  // This function will create the routes for every bookshelf
  createRoutes() {
    const { pages } = this.state;
    const routes = [];
    const { changeUrl, notFound } = this.props;

    pages.map((page) => {
      let env = page.substring(1);
      env = `?bookShelf=${env}`;
      routes.push(
        <Route
          path={`/bookshelf${page}/:page(\\d)`}
          key={page}
          render={
                    ({ match }) => {                      
                      changeUrl(`${env}&page=${match.params.page}`);
                      if (notFound === false) {
                        return (
                          <Books
                            path={`/bookshelf${page}`}
                          />
                        );
                      }
                      return (
                        <Redirect to="/bookshelf/NotFound" />
                      );
                    }
                }
        />,
      );
    });
    return routes;
  }

  render() {
    const { changeUrl, classes, notFound } = this.props;
    const { contentTitle } = this.state;
    return (
      <section>
        <div className={classes.sectionHeader}>
          <h2>{ contentTitle }</h2>
          <div className={classes.listIcons}>
            <a href="/">
              <FontAwesomeIcon icon={faThLarge} />
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faThList} />
            </a>
          </div>
        </div>
        <Switch>
          {this.createRedirects()}
          <Route
            path="/bookshelf/:page(\d)?"
            exact
            render={
                    ({ match }) => {
                      changeUrl(`?page=${match.params.page}`);
                      return (
                        <Books
                          path="/bookshelf"
                        />
                      );
                    }
                }
          />
          {this.createRoutes()}
          <Route
            path="/bookshelf/book/:id"
            exact
            render={
                    ({ match }) => {
                      const { id } = match.params;
                      changeUrl(`/${id}`);
                      return (
                        <BookInfo
                          url={`${process.env.HOME}/${match.params.id}`}
                        />
                      );
                    }
                }
          />

          <Route
            path="/bookshelf/search/:name/:page(\d)?"
            exact
            render={
                    ({ match }) => {
                      const { name, page = null } = match.params;
                      changeUrl(`?search=${name}&page=${page}`);
                      if (notFound === false) {
                        return (
                          <Books
                            path={`/bookshelf/search/${name}`}
                          />
                        );
                      }
                      return (
                        <Redirect to="/bookshelf/NotFound" />
                      );
                    }
                }
          />
          <Route component={NotFound} />
        </Switch>
      </section>
    );
  }
}

Section.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectSheet(styles)(Section);
