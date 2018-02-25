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

  showThoughts = () => {
    console.log("User", user);
    let user = window.sessionStorage.getItem('user');
    if (user) {
      this.setState({
        session: true,
        userName:user.user
      });
      return true;
    }
    this.props.history.push('/login');
    return null;
  };

  getThoughts = () => {
   	allThoughts()
    .then((thoughts) => {
      this.setState({
        thoughts
      });
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



  handleToggleProfile = () => {
  	this.setState(() => ({
      profileOpen: !this.state.profileOpen,
      indexOpen: !this.state.indexOpen
    }));
  };

  componentDidMount() {
    console.log(this.getThoughts());
    this.showThoughts();
  };

	render() {
    console.log("Session",this.state.session);
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
					<Profile/>
				}
				{ this.state.session ?
          <ThoughtContainer 
          thoughts={this.state.thoughts} 
          userName={this.state.userName ? this.state.userName : "Stranger"}
        /> 
        : null }
			</div>
		);
	}
};