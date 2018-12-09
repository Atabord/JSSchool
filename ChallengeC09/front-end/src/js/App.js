import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from './actions/actions-users';
import Header from './Header';
import Nav from './Nav';
import Section from './Section';
import Sidebar from './Sidebar';
import Login from './Login';
import NotFound from './404';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      isLogged: true,
    };
    this.handleLog = this.handleLog.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidMount() {
    const { verifyToken } = this.props;
    verifyToken();
  }

  // function to handle Change of searchBar value
  handleChangeSearch(event) {
    this.setState({
      searchVal: event.target.value,
    });
  }

  // function to handle login to the app, or logout in case of expired or undefined token
  handleLog(status) {
    this.setState({
      isLogged: status,
    });
  }

  render() {
    const { isLogged } = this.props;
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/"
              exact
              render={
                  () => (<Redirect to="/bookshelf" />)
              }
            />

            <Route
              path="/bookshelf"
              render={
                () => {
                  if (isLogged) {
                    return (
                      <div>
                        <Header
                          handleChange={this.handleChangeSearch}
                          searchVal={this.state.searchVal}
                        />
                        <div className="container">
                          <Nav changeUrl={this.onChangeUrl} />
                          <Section
                            handleLog={this.handleLog}
                          />
                          <Sidebar />
                        </div>
                      </div>
                    );
                  }
                  return (<Redirect to="/login" />);
                }
              }
            />
            <Route
              path="/login"
              exact
              render={
                () => (<Login handleLog={this.handleLog} />)
              }
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyToken }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
