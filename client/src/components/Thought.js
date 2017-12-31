import React from 'react';

const Thought = (props) => {
  return (
    <div className="thought-container">
    	<div className="text-container">
	      <p>{props.thought.text}</p>
	      <p className="creator">By: {props.thought._creatorName}</p>
      </div>
    </div>
  );
};

export default Thought;
