import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import Header from './Header';
import ThoughtContainer from './ThoughtContainer';
import Thought from './Thought';
import Profile from './Profile';

export default class ThoughtsApp extends React.Component {
	state = {
    thoughts: null,
    indexOpen: true,
    profileOpen: false
  };

  getThoughts = () => {
   	var self = this;
    axios.get(`${apiUrl}/thoughts/all`)
	    .then(function (response) {
	      self.setState({
	        thoughts: response.data.thoughts
	      });
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
  };

  componentDidMount() {
    this.getThoughts();
  };

  handleToggleProfile = () => {
    console.log("profile",this.state.profileOpen,"index",this.state.indexOpen);

  	this.setState(() => ({
      profileOpen: !this.state.profileOpen,
      indexOpen: !this.state.indexOpen
    }));
    console.log("profile",this.state.profileOpen,"index",this.state.indexOpen);

  };

	render() {
		return (
			<div className="main-wrapper">
				<Header 
					title="Thoughts" 
					handleToggleProfile={this.handleToggleProfile}
				/>
				{this.state.profileOpen &&
					<Profile 
						thoughts={this.state.thoughts ? this.state.thoughts : "jees"}
					/>
				}
				{this.state.thoughts && 
					<ThoughtContainer thoughts={this.state.thoughts}/>
				}
				
			</div>
		);
	}
};