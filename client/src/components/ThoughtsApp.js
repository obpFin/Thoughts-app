import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import { login } from './../utils/api/api';
import Header from './Header';
import ThoughtContainer from './ThoughtContainer';
import Thought from './Thought';
import Profile from './Profile';
import Login from './login';

export default class ThoughtsApp extends React.Component {
	state = {
    thoughts: null,
    session: null,
    user: ["userName": null, "jwt": null],
    indexOpen: true,
    profileOpen: false
  };

  getThoughts = () => {
   	var self = this;
    axios.get(`${apiUrl}/thoughts/all`)
	    .then(function (response) {
	    	self.setState(() => ({
	        thoughts: response.data.thoughts
    		}));
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const email = event.target.username.value;
  	const password = event.target.password.value;
   	let credentials = {email, password};
   	login(credentials)
  	.then((user) => {
  		console.log("user ", user);
   		if (user) {
	   		this.setState(() => ({
	   			user: {"userName": user.userName, "jwt": user.jwt},
	      	session:true
	    	}));
	    	console.log("login succeed", this.state.user);
   		}
   	});
  };

  handleAnynomousLogin = () => {
   	let credentials = {email: "test35464@example.com", password: "123456"};
   	login(credentials)
   	.then((loginSucceed) => {
   		if (loginSucceed) {
	   		this.setState(() => ({
	      	session:true
	    	}));
	    	console.log("login succeed");
   		}
   	});
  };

  componentDidMount() {
    this.getThoughts();
  };

  handleToggleProfile = () => {
  	this.setState(() => ({
      profileOpen: !this.state.profileOpen,
      indexOpen: !this.state.indexOpen
    }));
  };

	render() {
		return (
			<div className="main-wrapper">
				<Header 
					title="Thoughts" 
					handleToggleProfile={this.handleToggleProfile}
					showButtons={this.state.session}
					userName={this.state.user.userName}
				/>
				{this.state.profileOpen &&
					<Profile 
						thoughts={this.state.thoughts ? this.state.thoughts : "jees"}
					/>
				}
				{this.state.session ? 
					<ThoughtContainer thoughts={this.state.thoughts}/>
					:
					<Login handleLoginSubmit={this.handleLoginSubmit} handleAnynomousLogin={this.handleAnynomousLogin}/>
				}
				
			</div>
		);
	}
};