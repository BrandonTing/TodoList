import React from 'react';

import classes from './TaskArea.module.css';

const taskArea = (props) => {
    let minsRemain = Math.floor(props.timesRemain/60);
    let secRemain = props.timesRemain%60;
    if (props.timesRemain <= 0 ) {
        minsRemain = 0;
        secRemain = 0;    
    }
    let buttonShow = !props.isRunning
         ? <button 
        onClick = {props.startClicked}
        disabled={props.isRunning || props.timesRemain <= 0}>Start</button>
         : <button 
        onClick = {props.pauseClicked}
        disabled={!props.isRunning || props.timesRemain <= 0}>Pause</button>


    return (
        // Build seperate components for 3 boxes
        <div className={classes.TaskLists}>
            <p className = {classes.Box1}>Create New Task</p>
            <div className = {classes.Box2}>
                <p>Task Name : {props.currentTask}</p>
                <p>time remains : {minsRemain+ 'min ' + secRemain + 'sec'} </p>
                {buttonShow}
                <button
                    onClick = {props.resetClicked}>Reset</button>
            </div>
            <p className = {classes.Box3}>Task List</p>
        </div>
    )
}

export default taskArea;