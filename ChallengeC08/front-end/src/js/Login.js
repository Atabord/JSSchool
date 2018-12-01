import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/logo-jobsity.png';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            error:'', 
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleErrors(error){
        this.setState({
            error
        })
    }

    changeRedirect(status){
        this.setState({
            redirect: status
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.handleErrors('');

        let data = {
            username: this.state.username,
            password: this.state.password
        };

        fetch('http://localhost:3000/users/signIn', 
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
                .then(
                    (result) => {
                        if(result.token) {
                            sessionStorage.setItem('token', `Bearer ${result.token}`);
                            this.props.handleLog(true);
                            this.changeRedirect(true);
                        } else {
                            this.handleErrors(result.message);
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                )
    }

    render() {
        const { redirect } = this.state;
        if (redirect=== true) {
            return <Redirect to="/" />
        } else {
            return(
                <div className="form-container" onSubmit={this.handleSubmit}>
                    <img id="logo" className="login-logo" src={Logo} alt= "Jobsity Logo" />
                    <h1 className="login-title">Login</h1>
                    {this.state.error && 
                        <div className="alert"> 
                            <p>
                                {this.state.error}
                            </p>
                        </div>
                    }
                    <form className="login-form">
                        <div>
                            <FontAwesomeIcon icon={faUser}/>
                            <input type="text" name="username" id="username" placeholder="Username" onChange={e => this.handleChange(e)} required/>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUnlock}/>
                            <input type="password" name="password" id="password" autoComplete="off" placeholder="Password" onChange={e => this.handleChange(e)} required/>
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            )
        }
    }
}

export default Login;