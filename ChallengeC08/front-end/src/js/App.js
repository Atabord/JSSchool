import React, { Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Section from './Section';
import Sidebar from './Sidebar';
import Login from './Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            isLogged: true
        };
        this.handleLog = this.handleLog.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    handleLog(status){
        this.setState({
            isLogged: status
        })
    }

    updateSearch() {
        this.setState({search: event.target.value});
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact render = {
                        () => (<Redirect to="/bookshelf" />)
                    }/>

                    <Route path='/bookshelf' render = {
                        () => {
                            if (this.state.isLogged) {
                                return(
                                    <div>
                                        <Header searching={this.updateSearch}/>
                                        <div className="container">
                                            <Nav changeUrl={this.onChangeUrl}/>
                                            <Section filter={this.state.search} logged={this.state.isLogged} handleLog={this.handleLog}/>
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
                </div>
            </Router>
        )
    }
}

export default App;