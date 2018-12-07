import React, { Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Section from './Section';
import Sidebar from './Sidebar';
import Login from './Login';
import NotFound from './404';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchVal:'',
            isLogged: true
        };
        this.handleLog = this.handleLog.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    };

    // function to handle Change of searchBar value
    handleChangeSearch(event){
        this.setState({
            searchVal: event.target.value
        })
    }

    // function to handle login to the app, or logout in case of expired or undefined token
    handleLog(status){
        this.setState({
            isLogged: status
        })
    };

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact render = {
                            () => (<Redirect to="/bookshelf" />)
                        }/>

                        <Route path='/bookshelf' render = {
                            () => {
                                if (this.state.isLogged) {
                                    return(
                                        <div>
                                            <Header handleChange={this.handleChangeSearch} 
                                                searchVal={this.state.searchVal}/>
                                            <div className="container">
                                                <Nav changeUrl={this.onChangeUrl}/>
                                                <Section logged={this.state.isLogged}                                    
                                                    handleLog={this.handleLog}/>
                                                <Sidebar />
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return(<Redirect to="/login" />)
                                }
                            }
                        }/>
                        <Route path='/login' exact render = {
                            () => (<Login handleLog={this.handleLog}/>)
                        } />

                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
};

export default App;