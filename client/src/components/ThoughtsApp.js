import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchAllThoughts } from '../actions/thoughts';
import { apiUrl } from './../utils/utils';
import { getUser, login, logOut, profileThoughts } from './../utils/api/api';
import { getThoughts } from '../actions/thoughts';

import Header from './Header';
import ThoughtContainer from './ThoughtContainer';
import Thought from './Thought';
import Profile from './Profile';
import Login from './login';

window.onbeforeunload = (e) => {
  window.sessionStorage.removeItem('user');
};

class ThoughtsApp extends React.Component {

	state = {
    thoughts: null,
    session: null
  };

  setSession = () => {
    let user = getUser();
    if (user) {
      this.setState({
        session: true,
        userName:user.user
      });
      return true;
    } else {
      this.props.history.push('/login');
    }
  }

  getThoughts = () => {
     /*
    .then((thoughts) => {
      console.log(thoughts);
      this.setState({
        thoughts
      });
    });
    */
  };

  componentDidMount() {
    this.setSession();
    this.props.dispatch(fetchAllThoughts());
    // this.getThoughts();
  };

	render() {
    const { error, loading, products } = this.props;
		return (
			<div className="main-wrapper">
				{ this.state.session && this.props.thoughts &&
          <ThoughtContainer 
          thoughts={this.props.thoughts} 
          userName={this.state.userName ? this.state.userName : "Stranger"}
        /> 
        }
			</div>
		);
	}
};

const mapStateToProps = state => ({
  thoughts: state.thoughts,
  loading: state.thoughts.loading,
  error: state.thoughts.error
});

export default connect(mapStateToProps)(ThoughtsApp);