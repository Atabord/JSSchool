import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
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
    console.log(this.props.isLogged);
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
                  if (this.props.isLogged) {
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

export default connect(mapStateToProps)(App);
