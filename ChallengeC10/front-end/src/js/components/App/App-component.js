import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Header from '../Header/Header';
import Nav from '../Sidebars/Nav';
import Section from '../../containers/Section';
import Sidebar from '../Sidebars/Sidebar';
import Login from '../../containers/Login';
import NotFound from './404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      endpoint: process.env.URL,
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidMount() {
    const { verifyToken } = this.props;
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    verifyToken();
  }

  // function to handle Change of searchBar value
  handleChangeSearch(event) {
    this.setState({
      searchVal: event.target.value,
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
                          <Nav />
                          <Section />
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
                () => (<Login />)
              }
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
