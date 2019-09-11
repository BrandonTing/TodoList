import React from 'react';
import classes from './MoonAnimation.module.css';

import MoonImage from './MoonImage/MoonImage';

const moonAnimation = (props) => {
    // 根據任務是否開始來改變css格式。
    let animationState = props.running ? 'running' : 'paused';
    let classNames = props.showAnimation ? [classes.BaseMoonShadow, classes.BaseMoonShadow2] : [null , null];
    let style = {
        animation: props.animationForm,
        animationPlayState: animationState,
        animationDuration: props.targetTime + 's'        
    }
    return (
        <div className={classes.MoonArea}>
            <MoonImage />
            <div 
                className = {classNames[0]}
                style= {style} />
            <div 
                className = {classNames[1]}
                style= {style} />
        </div>
    )
}

export default moonAnimation;