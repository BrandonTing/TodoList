import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './TodoTasks.module.css';
import Task from './Task/Task';

const todoTasks = (props) => {
    // 利用filter排除掉正在執行的任務。
    let tasks = props.tasks.filter(task => props.tasks.indexOf(task) !== props.currentTask );
    // 只顯示前三個待辦事項。
    let top3Tasks = tasks.slice(0, 3);
    let taskLists = top3Tasks.map(task => (
        <CSSTransition 
            key = {task.name}
            classNames={{
                enter: classes['move-enter'],
                enterActive: classes['move-enter-active'],
                exitActive: classes['move-exit-active'],
                exit: classes['move-exit']
            }}
            timeout={300}>
            <li  className={classes.Task}>
                <Task 
                    task = {task}
                    taskClicked = {() => props.taskClicked('task', task)}
                    buttonClicked = {() => props.buttonClicked('Todo', task)}/>            
            </li>
        </CSSTransition>
    ))
    // 若tasks數列達到4個以上(一個current task，三個在列表中)，增加more連結，讓用戶能直達下方完整列表。
    let more = props.tasks.length > 4 ? <a href='#fullList' className = {classes.More}>...More</a> : null;

    return (
        <div className =  {classes.TasksList}>
            <TransitionGroup 
                component= "ul"
                className={classes.List}>
                    {taskLists}
            </TransitionGroup>
            {more}
        </div>
    )
}

export default todoTasks;