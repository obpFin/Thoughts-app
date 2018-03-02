import React from 'react';
import { withRouter } from "react-router-dom";

 class ProfileInfo extends React.Component {
	pushBack = () => {
    this.props.history.push('/');
	};
	render() {
		const { userName, email } = this.props.user;
		return (
			<div className = "profile info-container">
				<a onClick={this.pushBack} className="material-icons blue md-36">arrow_back</a>
				<div>
					<p className="darken blue">Usename</p>
					<p className="profile node">{userName} <span className="blue edit">edit</span></p>
					<p className="darken blue">Email</p>
					<p className="profile node">{email} <span className="blue edit">edit</span></p>
				</div>
			</div>
		);
	}
}

export default withRouter(ProfileInfo);