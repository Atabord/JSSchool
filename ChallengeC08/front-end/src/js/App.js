import React, { Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Section from './Section';
import Sidebar from './Sidebar';
import Login from './Login';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            url:"http://localhost:3000/books",
            search: '',
            isLogged: false
        };
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    onChangeUrl(newUrl) {
        this.setState({
            url: newUrl
        })
    }

    updateSearch() {
        this.setState({search: event.target.value});
    }

    render() {
        return (
            <div>
                {this.state.isLogged ? (
                    <div>
                        <Header searching={this.updateSearch}/>
                        <div className="container">
                            <Nav changeUrl={this.onChangeUrl}/>
                            <Section url={this.state.url} filter={this.state.search}/>
                            <Sidebar />
                        </div>
                    </div>
                ) : (
                    <Login />
                )}
            </div>
        )
    }
}

export default App;