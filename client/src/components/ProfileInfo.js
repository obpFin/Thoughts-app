import React from 'react';

export default class ProfileInfo extends React.Component {
	state = {

	}
	render() {
		console.log(this.props.thoughtsCount);
		return (
			<div className = "profile-info-container">
				<p>Nr. of thoughts: {this.props.thoughtsCount}</p>
			</div>
		);
	}
}