import React, { Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Section from './Section';
import Sidebar from './Sidebar';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Nav />
                    <Section />
                    <Sidebar />
                </div>
            </div>
        )
    }
}

export default App;