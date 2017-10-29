import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import ProfileInfo from './ProfileInfo';
import ThoughtContainer from './ThoughtContainer';

export default class Profile extends React.Component {

	state = {
		ProfileThoughts: null
	};

  getProfileThoughts = () => {
   	var self = this;
    axios.get(`${apiUrl}/users/me`)
      .then(function (response) {
      	console.log(response);
        // self.setState({
        //   thoughts: response.data.thoughts
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getProfileThoughts();
  };

	render() {
		return (
			<div>
				<ProfileInfo thoughtsCount={this.props.thoughts.length}/>
				<ThoughtContainer thoughts={this.state.ProfileThoughts}/>
			</div>
		);
	};
}