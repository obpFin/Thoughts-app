import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import { login, logOut, allThoughts, profileThoughts } from './../utils/api/api';
import Header from './Header';
import ThoughtContainer from './ThoughtContainer';
import Thought from './Thought';
import Profile from './Profile';
import Login from './login';

export default class ThoughtsApp extends React.Component {
	state = {
    thoughts: null,
    session: null,
    userName: null,
    indexOpen: true,
    profileOpen: false
  };

  getThoughts = () => {
   	allThoughts()
    .then((thoughts) => {
      this.setState({
        thoughts
      });
    });
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const email = event.target.username.value;
  	const password = event.target.password.value;
   	let credentials = {email, password};
   	login(credentials)
  	.then((userName) => {
   		if (userName) {
	   		this.setState(() => ({
	   			userName,
	      	session: true
	    	}));
	    	console.log("login succeed",sessionStorage.getItem('user'));
   		}
   	});
  };

  handleLogOut = (event) => {
    event.preventDefault();
  	logOut()
  	.then((response) => {
  		if (response) {
  			this.setState(() => ({
  				userName: null,
		    	session: null
  			}));
  		}
  	});
  };

  handleAnynomousLogin = () => {
   	let credentials = {email: "test35464@example.com", password: "123456"};
   	login(credentials)
   	.then((userName) => {
   		if (userName) {
	   		this.setState(() => ({
	   			userName,
	      	session:true
	    	}));
	    	console.log("login succeeded",sessionStorage.getItem('user'));
   		}
   	});
  };

  handleToggleProfile = () => {
  	this.setState(() => ({
      profileOpen: !this.state.profileOpen,
      indexOpen: !this.state.indexOpen
    }));
  };

  componentDidMount() {
    this.getThoughts();
  };

	render() {
		return (
			<div className="main-wrapper">
				<Header 
					title="Thoughts" 
					handleToggleProfile={this.handleToggleProfile}
					handleLogOut={this.handleLogOut}
					getThoughts={this.getThoughts}
					showButtons={this.state.session}
					userName={this.state.userName}
				/>
				{this.state.profileOpen &&
					<Profile 
						thoughts={this.state.thoughts}
					/>
				}
				{this.state.session ? 
					<ThoughtContainer thoughts={this.state.thoughts} userName={this.state.userName ? this.state.userName : "Stranger"}/>
					:
					<Login 
						handleLoginSubmit={this.handleLoginSubmit} 
						handleAnynomousLogin={this.handleAnynomousLogin}
						createAccount={this.createAccount}
					/>
				}
			</div>
		);
	}
};