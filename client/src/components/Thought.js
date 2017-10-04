import React from 'react';

const Thought = (props) => {
  console.log(props);
  return (
    <div className="thought-container">
      {props.thoughts && <p>{props.thoughts.text}</p>}
      <p className="main-color">By:</p>
      {props.thoughts && <p>{props.thoughts._creatorName}</p>}
    </div>
  );
};


export default Thought;
