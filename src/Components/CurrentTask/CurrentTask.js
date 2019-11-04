import React from 'react';

import classes from './CurrentTask.module.css';

const onGoingTasks = (props) => {
  // 計算所剩時間的分/秒。
  const timesRemain = props.currentTask.time - props.timesPassed;
  const minsRemain = Math.floor(timesRemain / 60);
  const secRemain = Math.floor(timesRemain % 60);
  // 若倒數結束(timesRemain為0)，分秒都顯示0。
  // 改為倒數結束後直接切換到下一個任務後，不需要這個步驟了。
  // if (timesRemain <= 0 ) {
  //   minsRemain = 0;
  //   secRemain = 0;
  // }
  // 若任務正在進行(時間正在倒數)，顯示pause按鈕，反之則顯示start。
  const buttonShow = !props.isRunning
    ? <button
      onClick = {props.startClicked}
      disabled={props.isRunning || timesRemain <= 0}
      className = {[classes.Button, classes.Start].join(' ')} />
    : <button
      onClick = {props.pauseClicked}
      disabled={!props.isRunning || timesRemain <= 0}
      className = {[classes.Button, classes.Pause].join(' ')} />;
  return (
    <div className = {classes.CurrentTask}>
      <p className = {classes.CurrentName}>{props.currentTask.name}</p>
      <p className = {classes.CurrentTime}>{minsRemain + 'min '} <br /> {secRemain + 'sec'} </p>
      {buttonShow}
      <button
        onClick = {props.resetClicked}
        disabled = {props.timesPassed === 0}
        className = {[classes.Button, classes.Reset].join(' ')} />
    </div>
  );
};

export default onGoingTasks;