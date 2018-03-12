import React from 'react';

import { login } from './../utils/api/api';
import {withRouter} from "react-router-dom";

class CreateAccount extends React.Component {




	render() {
		return (
    	<div className="new-account">
    		<p className="">Create new Account</p>
    		<form onSubmit={this.handleSubmit} className="form">
				  <div>
					  <input name="username" type="text" placeholder="Username" autoComplete="login username" />
					</div>
				  <div>
					  <input name="password" type="password" placeholder="Password" autoComplete="password" />
					  <input name="password-confirm" type="password" placeholder="Password" autoComplete="password" />
					</div>
					<div>
				  	<input id="submit-form" type="submit" value="Submit" />
				  </div>
				</form>
			</div>
		);
	}
}

export default withRouter(CreateAccount);