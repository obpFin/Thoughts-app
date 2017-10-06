import React from 'react';

const Thought = (props) => {
  return (
    <div className="thought-container">
      <p>{props.thought.text}</p>
      <p className=""><span className="creator">By: </span>{props.thought._creatorName}</p>
    </div>
  );
};


export default Thought;
