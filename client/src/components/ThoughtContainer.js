import React from 'react';
import { connect } from 'react-redux';
import selectThoughts from '../selectors/thoughts';


import Thought from './Thought';

class ThoughtContainer extends React.Component {
  mapThoughts = (thoughtsObj => thoughtsObj.thoughts.map((item) => {
  	return <Thought key={item._id} thought = {item} />
  }));
  	
  render () {
  	return (
      <div className="thoughts-container">
        {this.props.thoughts &&
    			this.props.thoughts &&
    			this.mapThoughts(this.props.thoughts)
        }
      </div>
  	);
	}
};

const mapStateToProps = (state) => {
  return {
    thoughts: selectThoughts(state.thoughts)
  };
};

export default connect(mapStateToProps)(ThoughtContainer);


