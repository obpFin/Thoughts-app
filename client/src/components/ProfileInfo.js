import React from 'react';
import { withRouter } from "react-router-dom";

 class ProfileInfo extends React.Component {
	 state = {
		 user: {
			userName: this.props.user.userName || '',
			email: this.props.user.email || ''
		 },
		 editUserName: false,
		 editEmail: false
	 }
	pushBack = () => {
    this.props.history.push('/');
	};
	setUser = (user) => {
		if (user) {
			this.setState({
				user
			});
		}
	}
	handleClickUserNameLabel = (e) => {
		/*
		this.state.userName != this.props.userName 
		&&
		this.saveUserName;
		*/
		this.setState({
			editUserName: !this.state.editUserName
		});
	}
	handleClickEmailLabel = (e) => {
		/*
		this.state.email != this.props.email 
		&&
		this.saveEmail;
		*/
		this.setState({
			editEmail: !this.state.editEmail
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.user != this.state.user) {
			this.setUser(nextProps.user);
		}
	}
	render() {
		const { userName, email } = this.state.user;
		return (
			<div className = "profile info-container">
				<a onClick={this.pushBack} className="material-icons blue md-36">arrow_back</a>
				<div>
					<div className="info cell">
						<p className="darken blue">Usename</p>
						<div>
							<input type="text" value={userName} onChange={this.handleChange} disabled={!this.state.editUserName}/>
							{ this.state.editUserName ? <i onClick={this.handleClickUserNameLabel}>save</i> : <i onClick={this.handleClickUserNameLabel}>edit</i>}
						</div>
					</div>
					<div className="info cell">
						<p className="darken blue">Email</p>
						<div>
							<input type="text" value={email} onChange={this.handleChange} disabled={!this.state.editEmail}/>
						{ this.state.editEmail ? <i onClick={this.handleClickEmailLabel}>save</i> : <i onClick={this.handleClickEmailLabel}>edit</i>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ProfileInfo);