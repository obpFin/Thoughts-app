import React from 'react';

export default class ProfileInfo extends React.Component {
	state = {

	}
	render() {
		const { userName, email } = this.props.user;
		return (
			<div className = "profile-info-container">
				<p>{userName}</p>
				<p>{email}</p>
			</div>
		);
	}
}