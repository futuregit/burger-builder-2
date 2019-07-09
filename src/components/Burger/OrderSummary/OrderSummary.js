import React, { Component } from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  //This could be a functional component
  componentWillUpdate() {
    console.log("[OrderSummary] componentWillUpdate")
  }

  render(){
    // this.props.ingredients is something like {bacon: 0, cheese: 0, meat: 0, salad: 0}
    // Return a JSX list of ingredients and the count
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}> {/* igKey is either bacon, cheese, meat, or salad. */}
            <span
              style={{textTransform: 'capitalize'}}>
                {igKey}
            </span>:
            {this.props.ingredients[igKey]} {/* the number value of ingredients. */}
          </li>
        );
      });
    return (
      <Auxilliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong> Total Price: {this.props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Auxilliary>
    );
  }

};

export default OrderSummary;