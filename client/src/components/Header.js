import React from 'react';

import HeaderMenu from './HeaderMenu'
import { apiUrl } from './../utils/utils';

export default class Header extends React.Component {

  state = {
    addThoughtOpen: false,
    accountOpen: false,
    settingsOpen: false
  };

  handleTitleClick = () => {
    //todo: location == development || production
    window.location.href = `http://localhost:8081`;
  };

  handleToggleThought = () => {
    this.setState(() => ({
      addThoughtOpen: !this.state.addThoughtOpen
    }));
  };

  handleToggleProfile = () => {
    console.log("Header.js toggle");
    this.props.handleToggleProfile;
  };

  render() {
    return (
    	<div id="header-container">
    	<table>
    		<tbody>
      		<tr className="header">
	      		<td>
	      			<h1 className="title" onClick={this.handleTitleClick}>{this.props.title}</h1>
	      		</td>
	      		<td>
	        		<i className="material-icons md-24">chat_bubble</i>
	      		</td>
	      		<HeaderMenu 
              handleToggleThought={this.handleToggleThought}
              handleToggleProfile={this.props.handleToggleProfile}
              addThoughtOpen={this.state.addThoughtOpen}
              showButtons={this.props.showButtons}
            />
      		</tr>
    		</tbody>
    	</table>
    	</div>
    );
  }
}

Header.defaultProps = {
title: 'Thoughts'
};



