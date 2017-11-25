import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import { apiUrl } from './../utils/utils';

export default class AddThoughtModal extends React.Component {

	handleSubmit = (event) => {
		event.preventDefault();
		let inputValue = this.textInput.value
		let token = JSON.parse(sessionStorage.getItem("user")).jwt;
		console.log("token", token);
		if (inputValue) {
			console.log();

			axios({ 
				method: 'POST', 
				url: `${apiUrl}/thoughts`, 
				headers: {"x-auth": token}, 
				data: { text:inputValue } 
			})
	    .then(function (response) {
	    	console.log(response);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
		}
	};

	render() {
		return (
			<Modal
	      isOpen={this.props.isOpen}
	      contentLabel="add a Thought"
	      onRequestClose={this.props.handleToggleThought}
	      closeTimeoutMS={200}
	      className="modal"
	  	>
	      <h3 className="modal-title">Share a thought!</h3>
	      <form onSubmit={this.handleSubmit}>
				  <input className="text-area" 
				  	type="text" 
				  	name="name" 
				  	ref={(input) => { this.textInput = input; }}
				  />
				  <input className="submit-thought" type="submit" value="Submit" />
				</form>
	  </Modal>
	 );
	}
  
};