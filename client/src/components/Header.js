import React from 'react';
import { withRouter } from "react-router-dom";
import { logOut, isLoggedIn } from '../utils/api/api';

import HeaderMenu from './HeaderMenu'
import { apiUrl } from './../utils/utils';
import DropDown from './HeaderDropdown'

class Header extends React.Component {

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

  handleLogOut = (event) => {
    event.preventDefault();
    logOut()
    .then((response) => {
      if (response) {
        this.setState(() => ({
          userName: null,
          session: null
        }));
        this.props.history.push('/login');
      }
    });
  };

  handleToggleProfile = () => {
    this.props.history.push('/profile');
  };

  handleToggleSettings = () => {
    this.setState(() => ({
      settingsOpen: !this.state.settingsOpen
    }));
  };

  render() {
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
              handleToggleProfile={this.handleToggleProfile}
              handleToggleSettings={this.handleToggleSettings}
              handleLogOut={this.handleLogOut}
              addThoughtOpen={this.state.addThoughtOpen}
              settingsOpen={this.state.settingsOpen}
              isLoggedIn={() => isLoggedIn()}
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

export default withRouter(Header)

Header.defaultProps = {
  title: 'Thoughts'
};



