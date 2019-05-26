import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = () => {
  //...
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo/>
      </div>
      <nav>
        <p>Items here</p>
        <NavigationItems />
      </nav>
    </div>

  );
};

export default sideDrawer;