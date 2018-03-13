import React from 'react';

import { login, createAccount } from './../utils/api/api';
import {withRouter} from "react-router-dom";

class CreateAccount extends React.Component {

  state = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleLoginPageClick = () => {
    this.props.history.push('/login');
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onChangePasswordConfirm = (e) => {
    this.setState({ confirmPassword: e.target.value });
  }

  verifyPassword(password, confirmPassword) {
    return password.length >= 5 &&
      password === confirmPassword;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = this.state;
    const user = {
      userName,
      email,
      password
    }
    if (this.verifyPassword(password, confirmPassword)) {
      createAccount(user)
      .then((user) => {
        if (user) {
          let credentials = {email: this.state.email, password: this.state.password};
          login(credentials)
          .then((userName) => {
            if (userName) {
              this.props.history.push('/');
              console.log("login succeed",sessionStorage.getItem('user'));
            }
          });
        }
      });
    }
  }

	render() {
    const { username, email, password, confirmPassword } = this.state;
		return (
    	<section className="new-account">
    		<p id="title">Create new account</p>
    		<form onSubmit={this.onSubmit} className="form">
				  <div>
					  <input value={username} onChange={this.onChangeUserName} type="text" placeholder="Username" autoComplete="username" />
					</div>
          <div>
					  <input value={email} onChange={this.onChangeEmail} type="text" placeholder="Email" autoComplete="email" />
					</div>
				  <div>
					  <input value={password} onChange={this.onChangePassword} type="password" placeholder="Password" autoComplete="password" />
					</div>
          <div>
            <input value={confirmPassword} onChange={this.onChangePasswordConfirm} type="password" placeholder="Confirm password" autoComplete="confirmpassword" />
          </div>
					<div>
				  	<input id="" className="submit create-user" type="submit" value="Submit" />
				  </div>
				</form>
        <p>Have an account? <span><a href="#" onClick={() => this.handleLoginPageClick()}>Log in</a></span></p>

			</section>
		);
	}
}

export default withRouter(CreateAccount);