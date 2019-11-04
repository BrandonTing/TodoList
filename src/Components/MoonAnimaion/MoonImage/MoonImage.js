import React from 'react';

import classes from './MoonImage.module.css';
import MoonImg from '../../../Assets/Images/moon.png';

const moonImage = (props) => (
  <React.Fragment>
    <img
      src={MoonImg}
      alt="Moon"
      className= {classes.MoonImg} />
  </React.Fragment>
);

export default moonImage;