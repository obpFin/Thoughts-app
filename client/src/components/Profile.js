import React from 'react';

export default class Profile extends React.Component {

	state = {
		thoughts: null
	}

	render() {
		return (
			{this.state.thoughts && 
				<ThoughtContainer thoughts={this.state.thoughts}/>
			}
		);
	}
}