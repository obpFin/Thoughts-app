import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import ProfileInfo from './ProfileInfo';
import ThoughtContainer from './ThoughtContainer';

import { userInfo } from '../utils/api/api';

export default class Profile extends React.Component {

	state = {
		ProfileThoughts: null,
    userInfo: {}
	};

  getUserInfo = () => {
   	userInfo()
    .then((user) => {
      this.setState({
        userInfo: {...user}
      });
    });
  };

  componentDidMount() {
    this.getUserInfo();
  };

	render() {
		return (
			<div>
				<ProfileInfo user={this.state.userInfo}/>
				<ThoughtContainer thoughts={this.state.ProfileThoughts}/>
			</div>
		);
	};
}