import React from 'react';

const Thought = (props) => {
  return (
    <div className="thought-container">
      <p>{props.thought.text}</p>
      <p className="creator">By: {props.thought._creatorName}</p>
    </div>
  );
};

export default Thought;
