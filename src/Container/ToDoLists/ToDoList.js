import React, { Component } from 'react';

import MoonAnimaion from '../../Components/MoonAnimaion/MoonAnimation';
import classes from './ToDoList.module.css';
import CreateNewTask from '../../Components/CreateNewTask/CreateNewTask';
import CurrentTask from '../../Components/CurrentTask/CurrentTask';
import TodoTasks from '../../Components/TodoTasks/TodoTasks';
import FullList from '../../Components/FullList/FullList';
import Alarms from '../../Assets/Audio/Alarm/Alarm';
import Musics from '../../Assets/Audio/Music/Music';

class TodoList extends Component {
    state = {
        items: {
            Todo : {
                list: [
                    {name: 'First Thing to do', time: 30},
                    {name: 'Second Thing to do', time: 60},
                    {name: 'Third Thing to do', time: 90},    
                    {name: 'Forth Thing to do', time: 30},    
                    {name: 'Fifth Thing to do', time: 60},    
                ],
                shouldExpand: false, 
            },
            Done : {
                list: [
                    {name: 'First Thing done', time: 25},
                    {name: 'Second Thing done', time: 30},
                    {name: 'Third Thing done', time: 35},    
                ],
                shouldExpand: false,
            },
            Music: {
                list: Musics,
                shouldExpand: false,
            },
            Alarm: {
                list: Alarms,
                shouldExpand: false,
            }
        },
        // 用currentState控制目前的任務、背景音樂以及鬧鈴。
        currentState: {
            task: 0,
            alarm: 0,
            music: 0,
        },
        formContent: {
            input: {
                elementConfig : {
                    type: 'text', 
                    placeholder: 'New task',
                },
                value: '',
            },
            select: {
                options: [
                    {value: 30, displayValue: 'Estimated Time: 30s'},
                    {value: 60, displayValue: 'Estimated Time: 60s'},
                    {value: 90, displayValue: 'Estimated Time: 90s'},
                ],
                value: 30,
            }
        },
        // isRunning控制時間是否繼續倒數以及動畫是否持續，showAnimation則是直接把animation去掉，在任務未開始時圖片不會被覆蓋。
        isRunning: false,
        showAnimation: false,
        timesPassed: 0,
        intervalId: null,
    }

    taskStartHandler = () => {
        // 利用Date()計算經過時間，再更新state。
        let startTime = new Date().getTime();
        let updatedTimePassed = this.state.timesPassed;
        let timer = setInterval(() => {
            updatedTimePassed += (new Date().getTime() - startTime)/1000;
            startTime = new Date().getTime();
            if (Math.floor(updatedTimePassed) >= this.state.items.Todo.list[this.state.currentState.task].time) {
                // 若任務時間到，則結束計時並播放鬧鈴，設定在10秒後結束鬧鈴。
                clearInterval(this.state.intervalId);
                this.alarm.load();
                this.alarm.play();
                setTimeout(() => {
                    this.alarm.pause();                    
                }, 10000);
                // 將原本的任務移至Done列表。
                this.taskDoneHandler('Todo', this.state.items.Todo.list[this.state.currentState.task]);
                this.setState({
                    isRunning: false, 
                    showAnimation: false,
                    timesPassed: updatedTimePassed});
            } else {
                this.setState({
                    timesPassed: updatedTimePassed,
                    isRunning: true, 
                    showAnimation: true,
                });
            }
        }, 100);
        // 將intervalId存在state中，方便稍後通過其他function控制。
        this.setState({intervalId: timer})
    }

    taskPauseHandler = () => {
        // 將時間與動畫暫停，並清除interval，稍後點擊開始鍵後會重新設置。
        this.setState({
            isRunning: false, 
        });
        clearInterval(this.state.intervalId)
    }

    taskResetHandler = () => {
        // 將timePassed歸零，並讓動畫相關div消失。
        this.setState({
            isRunning: false,
            timesPassed: 0,
            showAnimation: false,
        });
        clearInterval(this.state.intervalId)
    }

    // 設定表格的value隨用戶輸入改變。
    ChangeHandler = (event, type) => {
        const updatedContent = {
            ...this.state.formContent[type],
            value: event.target.value,
        }
        const updatedForm = {
            ...this.state.formContent,
            [type]: updatedContent,
        }
        this.setState({formContent : updatedForm})
    }

    newTaskHandler = (event) => {
        event.preventDefault();
        // 將表格中資料更新至TodoList中，並重置表格。
        const updatedItems = {
            ...this.state.items,
            Todo: {
                ...this.state.items.Todo,
                list: [
                    ...this.state.items.Todo.list,
                    {
                        name: this.state.formContent.input.value,
                        time: this.state.formContent.select.value,
                    }
                ]
            }
        };
        const updatedForm = {
            ...this.state.formContent,
            input: {
                ...this.state.formContent.input,
                value: '',    
            },
            select: {
                ...this.state.formContent.select,
                value: 30,
            },
        }
        this.setState({items: updatedItems, formContent: updatedForm})
    }

    // 改變目前的任務、背景音樂或鬧鈴。
    currentStateChangeHandler = (type, item) => {
        // 預設為第一項。
        let updatedIndex = 0;
        switch (type) {
            case 'task':
                updatedIndex = this.state.items.Todo.list.indexOf(item);
                break;
            case 'music':
                updatedIndex = this.state.items.Music.list.indexOf(item);
                break;
            case 'alarm':
                updatedIndex = this.state.items.Alarm.list.indexOf(item);
                break;
            default: 
                return updatedIndex = 0;
        }
        const updatedState = {
            ...this.state.currentState,
            [type]:updatedIndex,
        }
        this.setState({ currentState : updatedState})
        // 若目前的任務被改變，重置經過時間與動畫等。
        if (type === 'task') {
            this.taskResetHandler();
        }
    }

    // 控制任務完成或未完成的function。
    taskDoneHandler = (type, task) => {
        // 若目標對象處於未完成狀態，則改為完成，反之亦然。
        if (type === 'Todo') {
            this.state.items.Todo.list.splice(this.state.items.Todo.list.indexOf(task), 1);
            this.state.items.Done.list.push(task);
        } else if (type === 'Done') {
            this.state.items.Done.list.splice(this.state.items.Done.list.indexOf(task), 1);
            this.state.items.Todo.list.push(task);
        }
        const updatedTodoTask = this.state.items.Todo.list;
        const updatedDoneTask = this.state.items.Done.list;    
        const updatedTasks = {
            ...this.state.items,
            Todo: {
                ...this.state.items.Todo,
                updatedTodoTask,
            },
            Done: {
                ...this.state.items.Done,
                updatedDoneTask
            },
        }
        // 將目前未完成任務改為完成後，可能使目前任務index大於任務數量，若發生這種情況，則把目前任務改為現有任務的最後一項。
        let updatedCurrentTask = this.state.currentState.task;
        if (this.state.currentState.task >= (this.state.items.Todo.list.length - 1)) {
            updatedCurrentTask = this.state.items.Todo.list.length - 1 ;
        };
        const updatedCurrentState = {
            ...this.state.currentState,
            task: updatedCurrentTask
        }
        this.setState({tasks: updatedTasks, currentState: updatedCurrentState})
    }

    // 控制列表展開
    expandHandler = (type) => {
        this.setState(prevState => ({
            items: {
                ...prevState.items,
                [type] : {
                    ...prevState.items[type],
                    shouldExpand: !prevState.items[type].shouldExpand
                }
            }
        }))        
    }

    // 改變目前的任務或音效，音效會在改變後自動播放。
    changeItemHandler = (itemType, item) => {
        switch (itemType) {
            case 'Todo' :
                this.currentStateChangeHandler('task', item);
                this.WorkingList.scrollIntoView({behavior: 'smooth'})
                break;
            case 'Music':
                this.currentStateChangeHandler('music', item);
                this.music.pause();
                this.music.load();
                this.music.play();
                break;
            case 'Alarm':
                this.currentStateChangeHandler('alarm', item);
                this.music.pause();
                this.alarm.pause();
                this.alarm.load();
                this.alarm.play();
                // 鬧鈴在自動播放五秒後停止，並重新播放背景音樂
                setTimeout(() => {
                    this.alarm.pause();
                    this.music.play();
                }, 5000)
                break;
            default: 
                return;
        }
    }    

    render () {
        return (
            <React.Fragment>
                <div className = {classes.WorkingList} ref = {ref => this.WorkingList = ref}>
                    <div className={classes.CurrentTaskArea}>
                        <CurrentTask
                            currentTask = {this.state.items.Todo.list[this.state.currentState.task]} 
                            startClicked = {this.taskStartHandler}
                            pauseClicked = {this.taskPauseHandler}
                            resetClicked = {this.taskResetHandler}
                            isRunning = {this.state.isRunning}
                            timesPassed = {this.state.timesPassed} />
                        <CreateNewTask 
                            content = {this.state.formContent}
                            inputElement = {this.state.formContent.input}
                            selectElement = {this.state.formContent.select}
                            inputChanged = {(event) => {this.ChangeHandler(event, 'input')}}
                            selectChanged = {(event) => {this.ChangeHandler(event, 'select')}}
                            submitted = {this.newTaskHandler} />
                        <TodoTasks
                            tasks = {this.state.items.Todo.list}
                            currentTask = {this.state.currentState.task}
                            taskClicked = {this.currentStateChangeHandler}
                            buttonClicked = {this.taskDoneHandler} />
                    </div>
                    <div className = {classes.MediaArea}>
                        <MoonAnimaion 
                            running = {this.state.isRunning}
                            targetTime = {this.state.items.Todo.list[this.state.currentState.task].time}
                            showAnimation = {this.state.showAnimation} />
                        <div >
                            <audio className = {classes.Music} controls loop ref = {ref => this.music = ref}>
                                <source src= {this.state.items.Music.list[this.state.currentState.music].src} type = 'audio/mp3' />
                            </audio>
                            <audio ref = {ref => this.alarm = ref}>
                                <source src = {this.state.items.Alarm.list[this.state.currentState.alarm].src} type = 'audio/mp3' />
                            </audio>
                        </div>
                    </div>
                </div>
                <FullList 
                    tasks = {this.state.items}
                    clicked = {this.expandHandler}
                    itemChange = {this.changeItemHandler}
                    itemUnDone = {this.taskDoneHandler} />
            </React.Fragment>
        )
    }
}

export default TodoList;
