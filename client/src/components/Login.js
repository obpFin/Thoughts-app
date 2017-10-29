import React from 'react';

const Login = (props) => {
    return (
    	<div className="login-container">
    		<p className="login-title">Log into Thoughts</p>
    		<form className="login-form">
				  <div>
					  <input name="username" type="text" placeholder="Username" />
					</div>
				  <div>
					  <input name="password" type="password" placeholder="Password" />
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