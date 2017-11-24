import React from 'react';

const Login = (props) => {
    return (
    	<div className="login-container">
    		<p className="login-title">Log into Thoughts</p>
    		<form onSubmit={props.handleLoginSubmit} className="login-form">
				  <div>
					  <input name="username" type="text" placeholder="Username" autoComplete="login username" />
					</div>
				  <div>
					  <input name="password" type="password" placeholder="Password" autoComplete="login password" />
					</div>
					<div>
				  	<input id="submit-form" type="submit" value="Log in" />
				  </div>
				</form>
				<a href="#" onClick={() => props.handleAnynomousLogin()}>I just want to take a look around</a>
			</div>
		);
  };

export default Login;