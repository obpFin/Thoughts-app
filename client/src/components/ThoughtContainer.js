import React from 'react';

import Thought from './Thought';

export default class ThoughtContainer extends React.Component {

  mapThoughts = (props => props.thoughts.map((item) => {
  		return <Thought key={item._id} thought = {item} />
  }));
  	
  render () {
  	return (
  		<div className="thoughts-container">
  			{this.props.thoughts &&
  				this.mapThoughts(this.props)
  			}
  		</div>
  	);
	}
};


