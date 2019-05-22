import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {...}
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0
    }
  }
  render(){
    return (
      <Auxilliary>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </Auxilliary>
    );
  }
}

export default BurgerBuilder;