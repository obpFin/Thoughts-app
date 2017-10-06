import React from 'react';

import HeaderMenu from './HeaderMenu'

const Header = (props) => {
    return (
    	<div id="header-container">
    	<table>
    		<tbody>
      		<tr className="header">
	      		<td className="title">
	      			<h1>{props.title}</h1>
	      		</td>
	      		<td>
	        		<i className="material-icons md-24">chat_bubble</i>
	      		</td>
	      		<HeaderMenu />
      		</tr>
    		</tbody>
    	</table>
    	</div>
    );
  };

Header.defaultProps = {
	title: 'Thoughts'
};

export default Header;