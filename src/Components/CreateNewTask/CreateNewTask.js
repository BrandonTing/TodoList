import React from 'react';

import classes from './CreateNewTask.module.css';

const createNewTask = (props) => (
  <div className = {classes.NewTask}>
    <form onSubmit = {props.submitted}>
      <input
        className={classes.Input}
        type = {props.inputElement.elementConfig.type}
        placeholder = {props.inputElement.elementConfig.placeholder}
        value = {props.inputElement.value}
        onChange = {props.inputChanged}
        required />
      <select
        className={classes.Select}
        value = {props.selectElement.value}
        onChange = {props.selectChanged}>
        {props.selectElement.options.map(option => (
          <option key = {option.value} value = {option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
      <button className = {[classes.Button, classes.Add].join(' ')}>+</button>
    </form>
  </div>
);

export default createNewTask;