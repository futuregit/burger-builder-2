import React, { Component} from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }
  render(){
    return (
    <Auxilliary>
      <Toolbar />
      <SideDrawer
        open={this.state.showSideDrawer}
        closed={this.sideDrawerCloseHandler}/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Auxilliary>
  );
  }
}

export default Layout;