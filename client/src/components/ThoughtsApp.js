import React from 'react';
import axios from 'axios';

import { apiUrl } from './../utils/utils';
import Header from './Header';

export default class ThoughtsApp extends React.Component {
	constructor(){
    super();
    this.state = {
      thoughts: {}
    };
  }

  componentDidMount() {
    this.testConnection();
  }

  testConnection() {
  	var self = this;
    axios.get(`${apiUrl}/thoughts`)
	    .then(function (response) {
	      self.setState({
	        thoughts: response.data.thoughts
	      });
	      console.log(self.state);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
  }

	render() {
		return (
			<Header title="Thoughts" />
		);
	}
}