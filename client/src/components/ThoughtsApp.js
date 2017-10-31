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
    user: ["userName": null, "x-auth": null],
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

  handleAnynomousLogin = () => {
   	let credentials = {email: "test35464@example.com", password: "123456"};
   	login(credentials)
   	.then((loginSucceed) => {
   		if (loginSucceed) {
	   		this.setState(() => ({
	      	session:true
	    	}));
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
				/>
				{this.state.profileOpen &&
					<Profile 
						thoughts={this.state.thoughts ? this.state.thoughts : "jees"}
					/>
				}
				{this.state.session ? 
					<ThoughtContainer thoughts={this.state.thoughts}/>
					:
					<Login handleAnynomousLogin={this.handleAnynomousLogin}/>
				}
				
			</div>
		);
	}
};