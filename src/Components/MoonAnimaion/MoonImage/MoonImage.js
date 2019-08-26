import React from 'react';
import classes from './MoonImage.module.css';

const moonImage = (props) => (
    <React.Fragment>
        <img 
            src="https://upload.cc/i1/2019/08/26/8h26Uu.png" 
            alt="Moon"
            className= {classes.MoonImg} />
    </React.Fragment>
)

export default moonImage;