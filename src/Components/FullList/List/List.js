import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import classes from './List.module.css';

const list = (props) => {
  let buttonText = '+';
  let List = null;
  let btnType = 'Start';
  if (props.shouldExpand) {
    buttonText = '-';
    List = props.items.list.map(item => {
      // 已完成事項的按鈕功能並非執行，而是將已完成事項改為未完成，因此格式不同。
      if (props.type === 'Done') {
        btnType = 'Done';
      }
      return (
        <CSSTransition
          key = {item.name}
          classNames={{
            enter: classes['move-enter'],
            enterActive: classes['move-enter-active'],
            exitActive: classes['move-exit-active'],
            exit: classes['move-exit']
          }}
          timeout={300}>
          <li
            key = {item.name}
            className = {classes.item}>
            {item.name}
            <button
              className = {[classes.Button, classes[btnType]].join(' ')}
              onClick = {() => props.itemClicked(props.type, item)}/>
          </li>
        </CSSTransition>
      );
    });
  }
  return (
    <div className = {classes.List}>
      <span className = {classes.ListType}>{props.type.toUpperCase()}</span>
      <button
        className = {[classes.Button, classes.Add].join(' ')}
        onClick = {props.clicked}>{buttonText}</button>
      <TransitionGroup
        component= "ul"
        className={classes.items}>
        {List}
      </TransitionGroup>
    </div>
  );
};

export default list;