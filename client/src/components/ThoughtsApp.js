import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import { getUser, login, logOut, allThoughts, profileThoughts } from './../utils/api/api';
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
    session: null
  };

  setSession = () => {
    let user = getUser();
    if (user) {
      this.setState({
        session: true,
        userName:user.user
      });
      return true;
    } else {
      this.props.history.push('/login');
    }
  }

  getThoughts = () => {
   	allThoughts()
    .then((thoughts) => {
      this.setState({
        thoughts
      });
    });
  };

  componentDidMount() {
    this.setSession();
    this.getThoughts();
  };

	render() {
		return (
			<div className="main-wrapper">
				{ this.state.session && this.state.thoughts &&
          <ThoughtContainer 
          thoughts={this.state.thoughts} 
          userName={this.state.userName ? this.state.userName : "Stranger"}
        /> 
        }
			</div>
		);
	}
};