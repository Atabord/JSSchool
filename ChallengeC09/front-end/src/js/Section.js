import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeUrl } from './actions/actions-books';
import Books from './Books';
import BookInfo from './bookInfo';
import NotFound from './404';

// this component will return the main section of the page depending on its route
class Section extends Component {
  constructor() {
    super();
    this.state = {
      contentTitle: 'Home',
      pages: ['/Quito', '/Medellin', '/Cartagena', '/Digital', '/Personal_Loans'],
      notFound: false,
    };
    this.createRedirects = this.createRedirects.bind(this);
    this.createRoutes = this.createRoutes.bind(this);
    this.handleNotFount = this.handleNotFount.bind(this);
  }

  // If the page or bookshelf doesn't exist, this function will handle the notFound state
  handleNotFount(status) {
    this.setState({
      notFound: status,
    });
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
    const { changeUrl } = this.props;

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
                      if (this.state.notFound === false) {
                        return (
                          <Books
                            path={`/bookshelf${page}`}
                            notFound={this.handleNotFount}
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
    const { changeUrl } = this.props;
    return (
      <section>
        <div className="section-header">
          <h2>{ this.state.contentTitle }</h2>
          <div className="list-icons">
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
                          notFound={this.handleNotFount}
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
                    ({ match }) => (
                      <BookInfo
                        url={`${process.env.HOME}/${match.params.id}`}
                        handleLog={this.props.handleLog}
                        notFound={this.handleNotFount}
                      />
                    )
                }
          />

          <Route
            path="/bookshelf/search/:name/:page(\d)?"
            exact
            render={
                    ({ match }) => {
                      const { name, page = null } = match.params;
                      changeUrl(`?search=${name}&page=${page}`);
                      return (
                        <Books
                          path={`/bookshelf/search/${name}`}
                          notFound={this.handleNotFount}
                        />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeUrl }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Section));
