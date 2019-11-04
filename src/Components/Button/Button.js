import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
  const styleAppend = {
    width: props.width,
    height: props.height,
    position: props.position,
    left: props.left,
    top: props.top,
    right: props.right,
    bottom: props.bottom,
    borderWidth: props.borderwidth,
    fontSize: props.fontsize
  };
  return (
    <button
      className = {[classes.Button, classes[props.btnType]].join(' ')}
      onClick = {props.clicked}
      disabled = {props.disabled}
      style = {styleAppend}>{props.children}
    </button>
  );
};

export default button;