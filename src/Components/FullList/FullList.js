import React from 'react';

import classes from './FullList.module.css';
import List from './List/List';

const fullList = (props) => {
  // 將待辦事項、已完成事項、音樂及鬧鈴都個別做出列表。其中已完成事項的function不同。
  const list = Object.keys(props.tasks).map((items) => {
    const propsName = items === 'Done' ? props.itemUnDone : props.itemChange;
    return (
      <List
        key = {items}
        type = {items}
        items = {props.tasks[items]}
        shouldExpand = {props.tasks[items].shouldExpand}
        clicked = {() => props.clicked(items)}
        itemClicked = {propsName} />
    );
  });
  return (
    <div className = {classes.FullList} id='fullList'>
      {list}
    </div>
  );
};

export default fullList;