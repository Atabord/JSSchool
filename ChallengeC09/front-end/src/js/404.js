import React from 'react';
import { Link } from 'react-router-dom';

// This component will return a 404 page
const NotFound = () => (
  <div className="notFoundContainer">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      The page you are trying to access doesn’t exist,
      please try with another page or visit our homepage
    </p>
    <Link to="/">Homepage</Link>
  </div>
);

export default NotFound;
