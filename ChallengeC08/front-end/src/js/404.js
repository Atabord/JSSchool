import React, { Component } from 'react';
import Logo from '../images/logo-jobsity.png';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return(
            <div className="notFoundContainer">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are trying to access doesn't exist, please try with another page or visit our homepage</p>
                <Link to="/">Homepage</Link>
            </div>
        )
    }
}

export default NotFound;