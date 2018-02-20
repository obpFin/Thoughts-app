import React from 'react';

import HeaderMenu from './HeaderMenu'
import { apiUrl } from './../utils/utils';
import DropDown from './HeaderDropdown'

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
    this.props.handleToggleProfile;
  };

  handleToggleSettings = () => {
    console.log("toggle");
    this.setState(() => ({
      settingsOpen: !this.state.settingsOpen
    }));
  };

  render() {
    console.log(this.state.settingsOpen);
    return (
    	<div id="header-container">
      {this.state.settingsOpen && <div className="settings-backdrop" onClick={this.handleToggleSettings}></div>}
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
              handleToggleSettings={this.handleToggleSettings}
              handleLogOut={this.props.handleLogOut}
              getThoughts={this.props.getThoughts}
              addThoughtOpen={this.state.addThoughtOpen}
              settingsOpen={this.state.settingsOpen}
              showButtons={this.props.showButtons}
              userName={this.props.userName}
            />
      		</tr>
    		</tbody>
    	</table>
      <DropDown 
        menuActive={this.state.settingsOpen}
        handleLogOut={this.props.handleLogOut}
        handleToggleSettings={this.handleToggleSettings}
      />
    	</div>
    );
  }
}

Header.defaultProps = {
  title: 'Thoughts'
};



