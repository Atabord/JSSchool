import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { login } from './actions/actions-users';
import Logo from '../images/logo-jobsity.png';

// this component returns the login page
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  // this function handles the change of every input of the login form
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // this function allows us to show the user avery single error when trying to login
  handleErrors(error) {
    this.setState({
      error,
    });
  }

  // this is to tell the page to redirect after login
  changeRedirect(status) {
    this.setState({
      redirect: status,
    });
  }

  // this function will handle submit
  handleSubmit(event) {
    event.preventDefault();

    this.handleErrors('');
    const { username, password } = this.state;
    const { login } = this.props;
    const data = {
      username,
      password,
    };

    // fetching to send the user info and receive its response
    login(data);
    // fetch('http://localhost:3000/users/signIn',
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       // the server response will have a token if success, else it will send an error message
    //       if (result.token) {
    //         // if success, save the token in the sessionStorage
    //         sessionStorage.setItem('token', `Bearer ${result.token}`);
    //         this.props.handleLog(true);
    //         this.changeRedirect(true);
    //       } else {
    //         this.handleErrors(result.message);
    //       }
    //     },
    //     (err) => {
    //       this.handleErrors(err);
    //     },
    //   );
  }

  render() {
    const { redirect, error } = this.state;
    console.log(this.props);
    if (redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="form-container" onSubmit={this.handleSubmit}>
        <img id="logo" className="login-logo" src={Logo} alt="Jobsity Logo" />
        <h1 className="login-title">Login</h1>
        {error
            && (
              <div className="alert">
                <p>
                  {error}
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
          <button>Login</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
