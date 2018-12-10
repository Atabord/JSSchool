import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../images/logo-jobsity.png';

// this component returns the login page
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // this function handles the change of every input of the login form
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // this function will handle submit
  handleSubmit(event) {
    event.preventDefault();

    const { username, password } = this.state;
    const { login } = this.props;
    const data = {
      username,
      password,
    };

    // fetching to send the user info and receive its response
    login(data);
  }

  render() {
    const { isLogged, loginError } = this.props;
    if (isLogged === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="form-container" onSubmit={this.handleSubmit}>
        <img id="logo" className="login-logo" src={Logo} alt="Jobsity Logo" />
        <h1 className="login-title">Login</h1>
        {loginError
            && (
              <div className="alert">
                <p>
                  {loginError}
                </p>
              </div>
            )
        }
        <form className="login-form">
          <div>
            <FontAwesomeIcon icon={faUser} />
            <input type="text" name="username" id="username" placeholder="Username" onChange={e => this.handleChange(e)} required />
          </div>
          <div>
            <FontAwesomeIcon icon={faUnlock} />
            <input type="password" name="password" id="password" autoComplete="off" placeholder="Password" onChange={e => this.handleChange(e)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
