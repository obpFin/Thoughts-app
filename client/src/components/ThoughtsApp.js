import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import { login, logOut, allThoughts, profileThoughts } from './../utils/api/api';
import Header from './Header';
import ThoughtContainer from './ThoughtContainer';
import Thought from './Thought';
import Profile from './Profile';
import Login from './login';

window.onbeforeunload = (e) => {
  window.sessionStorage.removeItem('user');
};

export default class ThoughtsApp extends React.Component {

	state = {
    thoughts: null,
    session: null,
    userName: null,
    indexOpen: true,
    profileOpen: false
  };

  showThoughts = () => {
    let user = window.sessionStorage.getItem('user');
    if (user) {
      this.setState({
        session: true,
        userName:user.user
      });
      this.getThoughts();
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

  componentDidMount() {
    this.showThoughts();
  };

	render() {
		return (
			<div className="main-wrapper">
				{this.state.profileOpen &&
					<Profile/>
				}
				{ this.state.session &&
          <ThoughtContainer 
          thoughts={this.state.thoughts} 
          userName={this.state.userName ? this.state.userName : "Stranger"}
        /> 
        }
			</div>
		);
	}
};