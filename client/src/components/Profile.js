import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import ProfileInfo from './ProfileInfo';
import ThoughtContainer from './ThoughtContainer';

import { userInfo,isLoggedIn } from '../utils/api/api';

export default class Profile extends React.Component {

	state = {
		ProfileThoughts: null,
    userInfo: {}
	};

  getUserInfoOr404 = () => {
   	userInfo()
    .then((user) => {
      this.setState({
        userInfo: {...user}
      });
    })
    .catch((error) => {
      this.props.history.push('/404');
    });
  };

  componentDidMount() {
    this.getUserInfoOr404();
  };

	render() {
		return (
			<div>
				<ProfileInfo user={this.state.userInfo}/>
			</div>
		);
	};
}