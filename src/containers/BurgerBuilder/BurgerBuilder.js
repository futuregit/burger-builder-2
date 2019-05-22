import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
  }
  removeIngredientHandler = (type) => {

  }

  render(){
    return (
      <Auxilliary>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls />
      </Auxilliary>
    );
  }
}

export default BurgerBuilder;