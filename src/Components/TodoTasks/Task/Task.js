import React from 'react';

import classes from './Task.module.css';

const task = (props) => (
  <div>
    <p>{props.task.name} : <strong>{props.task.time}</strong>s</p>
    <button
      className = {[classes.Button, classes.onGoing].join(' ')}
      onClick = {props.buttonClicked} />
    <button
      className = {[classes.Button, classes.Start].join(' ')}
      onClick = {props.taskClicked} />
  </div>
);

export default task;