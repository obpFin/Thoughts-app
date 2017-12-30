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
    window.location.href = 'http://localhost:8080';
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
    console.log(this.props.userName)
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
            <td className="welcome-text">
              {this.props.userName && <i>Hello {this.props.userName}!</i>}
            </td>
	      		<HeaderMenu 
              handleToggleThought={this.handleToggleThought}
              handleToggleProfile={this.props.handleToggleProfile}
              getThoughts={this.props.getThoughts}
              addThoughtOpen={this.state.addThoughtOpen}
              showButtons={this.props.showButtons}
              userName={this.props.userName}
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



