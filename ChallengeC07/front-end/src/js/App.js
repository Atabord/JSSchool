import React, { Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Section from './Section';
import Sidebar from './Sidebar';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            url:"http://localhost:3000/books"
        };
        this.onChangeUrl = this.onChangeUrl.bind(this);
    }

    onChangeUrl(newUrl) {
        console.log(newUrl);
        this.setState({
            url: newUrl
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Nav changeUrl={this.onChangeUrl}/>
                    <Section url={this.state.url} />
                    <Sidebar />
                </div>
            </div>
        )
    }
}

export default App;