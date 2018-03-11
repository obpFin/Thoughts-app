import React from 'react';
import { withRouter } from "react-router-dom";
import { userInfo, updateUser } from '../utils/api/api';

 class ProfileInfo extends React.Component {
	 state = {
		 user: {
			onLoadUserName: this.props.user.userName,
			onLoadEmail: this.props.user.email,
			userName: this.props.user.userName || '',
			email: this.props.user.email || ''
		 },
		 editing: false
	 }
	pushBack = () => {
    this.props.history.push('/');
	};
	setUser = (userData) => {
		if (userData) {
			let user = {
				...userData,
				onLoadUser: userData.userName,
				onLoadEmail: userData.email
			}
			this.setState({
				user
			});
		}
	}
	onChangeUserName = (e) => {
		const user = {...this.state.user};
		user.userName = e.target.value
    this.setState(() => ({ user }));
	}
	onChangeEmail = (e) => {
		const user = {...this.state.user};
		user.email = e.target.value
    this.setState(() => ({ user }));
	}
	handleClickLabel = (e) => {
		if (this.state.editing) {
			let { userName, email, onLoadUser, onLoadEmail } = this.state.user;
			if (onLoadUser !== userName || onLoadEmail !== email) {
				updateUser(userName, email);
			}
		}
		this.setState({
			editing: !this.state.editing
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
							<input type="text" value={userName} onChange={this.onChangeUserName} disabled={!this.state.editing}/>
							{ this.state.editing ? <i onClick={this.handleClickLabel}>save</i> : <i onClick={this.handleClickLabel}>edit</i>}
						</div>
					</div>
					<div className="info cell">
						<p className="darken blue">Email</p>
						<div>
							<input type="text" value={email} onChange={this.onChangeEmail} disabled={!this.state.editing}/>
						{ this.state.editing ? <i onClick={this.handleClickLabel}>save</i> : <i onClick={this.handleClickLabel}>edit</i>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ProfileInfo);