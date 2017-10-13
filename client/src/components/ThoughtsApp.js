import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import Header from './Header';
import ThoughtContainer from './ThoughtContainer';
import Thought from './Thought';

export default class ThoughtsApp extends React.Component {
	state = {
    thoughts: null
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
  }

	render() {
		return (
			<div className="main-wrapper">
				<Header title="Thoughts" />
				{this.state.thoughts && 
					<ThoughtContainer thoughts={this.state.thoughts}/>
				}
			</div>
		);
	}
};