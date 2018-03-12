import React from 'react';

import { login } from './../utils/api/api';
import {withRouter} from "react-router-dom";

class Login extends React.Component {
  createAccount() {
    this.props.history.push('/signup');
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.username.value;
    const password = e.target.password.value;
    let credentials = {email, password};
    login(credentials)
    .then((userName) => {
      if (userName) {
        this.setState(() => ({
          userName,
          session: true
        }));
        this.console.log(props.history);
        this.props.history.push('/');
        console.log("login succeed",sessionStorage.getItem('user'));
      }
    });
  };

  handleAnynomousLogin = () => {
    let credentials = {email: "testuser@mail.com", password: "123456"};
    login(credentials)
    .then((user) => {
      if (window.sessionStorage.getItem('user')) {
        console.log("login succeeded",sessionStorage.getItem('user'));
        this.props.history.push('/');
      }
    });
  };

	render() {
		    return (
    	<section className="login-container">
    		<p className="login-title">Log into Thoughts</p>
    		<form onSubmit={this.handleLoginSubmit} className="login-form">
				  <div>
					  <input name="username" type="text" placeholder="Username" autoComplete="login username" />
					</div>
				  <div>
					  <input name="password" type="password" placeholder="Password" autoComplete="login password" />
					</div>
					<div>
				  	<input id="submit-form" className="submit" type="submit" value="Log in" />
				  </div>
				</form>
				<a href="#" onClick={() => this.createAccount()}>Create Account</a>
				<a href="#" onClick={() => this.handleAnynomousLogin()}>I just want to take a look around</a>
			</section>
		);
	}
}

export default withRouter(Login);