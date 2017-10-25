import React from 'react';
import AddThoughtModal from './AddThoughtModal';

const HeaderMenu = (props) => {
    return (
			<td className="upper-menu">
	  		<a onClick={props.handleToggleThought} className="add-thought material-icons md-32">add_circle</a>
	  		<a onClick={props.handleToggleProfile} className="account material-icons md-32">account_circle</a>
	  		<a className="settings material-icons md-32">power_settings_new</a>
				<AddThoughtModal 
					isOpen = {props.addThoughtOpen} 
					handleToggleThought = {props.handleToggleThought}
				/>
			</td>
    );
  };

export default HeaderMenu;