import React from 'react';
import classes from './DrawerToggle.css';

const drawToggle = (props) => (
  <div
  onClick={props.clicked}
  className={classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawToggle;