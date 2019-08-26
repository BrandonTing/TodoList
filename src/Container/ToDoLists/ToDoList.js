import React, { Component } from 'react';

import TaskArea from '../../Components/TaskArea/TaskArea';
import MoonImage from '../../Components/MoonAnimaion/MoonAnimation';
import classes from './ToDoList.module.css';

class ToDoList extends Component {
    state = {
        isRunning: false,
        targetTime: 150,
        timesRemain: 150,
        intervalId: null,
        showAnimation: false,
        timePerRound: 30,
        roundsPassed: null,
    }


    taskStartHandler = () => {
        this.setState({
            isRunning: true, 
            showAnimation: true,
        });
        let timer = setInterval(() => {
            this.setState({timesRemain: this.state.timesRemain - 1});
            console.log(this.state.timesRemain)
        }, 1000);
        this.setState({intervalId: timer})
    }

    taskPauseHandler = () => {
        this.setState({
            isRunning: false, 
        });
        clearInterval(this.state.intervalId)
    }

    taskResetHandler = () => {
        this.setState({
            isRunning: false,
            timesRemain: this.state.targetTime,
            showAnimation: false,
        });
        clearInterval(this.state.intervalId)
    }

    render () {
        return (
            <div className = {classes.ToDoList}>
                <TaskArea 
                    currentTask='Practice React' 
                    timesRemain = {this.state.timesRemain}
                    startClicked = {this.taskStartHandler}
                    pauseClicked = {this.taskPauseHandler}
                    resetClicked = {this.taskResetHandler}
                    isRunning = {this.state.isRunning} />
                <div className = {classes.RightArea}>
                    <MoonImage 
                        running = {this.state.isRunning}
                        timePerRound = {this.state.timePerRound}
                        showAnimation = {this.state.showAnimation} />
                    <p className = {classes.MusicArea}>Music Area</p>
                </div>
            </div>
        )
    }
}

export default ToDoList;
