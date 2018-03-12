import React from 'react';

import { login } from './../utils/api/api';
import {withRouter} from "react-router-dom";

class CreateAccount extends React.Component {

  handleLoginPageClick = () => {
    this.props.history.push('/login');
  }

	render() {
		return (
    	<section className="new-account">
    		<p id="title">Create new account</p>
    		<form onSubmit={this.handleSubmit} className="form">
				  <div>
					  <input name="username" type="text" placeholder="Username" autoComplete="login username" />
					</div>
				  <div>
					  <input name="password" type="password" placeholder="Password" autoComplete="password" />
					</div>
          <div>
            <input name="password-confirm" type="password" placeholder="Confirm password" autoComplete="password" />
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