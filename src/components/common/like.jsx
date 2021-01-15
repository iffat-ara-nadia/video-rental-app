import React from "react";

//Interface of this component:
//Input: Liked : Boolean
//Output: onClick

//SFC (Stateless Functional Component)
const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o"; //if false //-="-o" possible?
  //render these classes dynamically
  return (
    <i
      onClick={props.onClick} //Didn't clearly understand this explanation
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
