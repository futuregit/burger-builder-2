import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};


class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    // Getting ingredients from server and populating state.ingredients
    // {bacon: 0, cheese: 0, meat: 0, salad: 0}
    // axios.get('https://react-burger-builder2-28e8f.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.props.onLoadIngredients(response.data)
    //   })
    //   .catch(error => {
    //     this.setState({error: true});
    //   });
    this.props.onLoadIngredients();
  }

  //updatePurchaseState logic take the sum of all ingredients
  //  and check to see if it is greater than 0
  //  to set purchaseable true or false.
  // In other words was some ingredients selected to make an order.
  updatePurchaseState = (ingredients) => {
    // Example of ingredients: {bacon: 0, cheese: 0, meat: 1, salad: 0}
    // Get the value from the keys and return that array
    const sum = Object.keys(ingredients)// map call a function on every element and return an array
      .map(igKey => {
        return ingredients[igKey];
      }) // For example [0,0,0,1] the reduce method would return 1
        .reduce((sum, el)=>{
          return sum + el;
        },  0);
    return  sum > 0;
  }

  //addIngredientHandler take the ingredient count
  //  and add the number and set the price.
  // type contains salad, bacon, meat, or cheese.
  // This value come back from the child component BuildControl.
  addIngredientHandler = (type) => {
    //this.state.ingredients is something like {bacon: 0, cheese: 0, meat: 0, salad: 0}
    // oldCount adds up the number of each ingredients received.
    const oldCount = this.props.igns[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.props.igns
    };
    // Add new ingredients count.
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.props.grandTotal;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }
  // Remove ingredient from burger.
  // type contains salad, bacon, meat, or cheese.
  // This value come back from the child component BuildControl.
  removeIngredientHandler = (type) => {
    const oldCount = this.props.igns[type];
    // If ingredients to be removed is zero or less, simply return.
    if (oldCount <= 0){
      return
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.props.igns
    };
    updatedIngredients[type] = updatedCount;
    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.props.grandTotal;
    const newPrice = oldPrice - priceReduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  // purchaseHandler and purchaseCancelHandler
  // functions determine whether to show the Modal component or not.
  // The Modal component controls the showing of the order summary.
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // // this.state.ingredients may contain something like {bacon: 0, cheese: 0, meat: 0, salad: 0}
    // for (let i in this.props.igns){
    //   //encodeURIComponent encodes certain character with escape sequences
    //   // Example only: bacon=1&cheese=1&meat=1&salad=0
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // // queryParams example: bacon=1&cheese=1&meat=1&salad=0price=6.4
    // queryParams.push('price=' + this.props.grandTotal);
    // // queryString example: bacon=1&cheese=1&meat=1&salad=0&price=6.4
    // const queryString = queryParams.join('&');
    // props.history URL may look like:
    // http://localhost:3000/checkout?bacon=1&cheese=1&meat=1&salad=0&price=6.4
    this.props.history.push('/checkout');
  }

  render(){
    // disabledInfo controls whether the less buttons are visable for removing ingredients.
    // copy something like {bacon: 0, cheese: 0, meat: 0, salad: 0} to disabled
    const disabledInfo = {
      //Spread operator to copy state immutably to disabledInfo.
      ...this.props.igns
    };
    // Now go through all the values using to key and set true or false
    // if value is less than or equal to zero.
    // For something like {bacon: 0, cheese: 0, meat: 0, salad: 0},
    // the result would be {bacon: false, cheese: false, meat: false, salad: false}
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredient can't be loaded</p> : <Spinner />;
    // If nothing was ordered this.state.ingredients defaults to null.
    if(this.props.igns){
      orderSummary = (
        <OrderSummary
          ingredients={this.props.igns}
          price={this.props.grandTotal.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}/>
      );

      burger = (
        <Auxilliary>
          <Burger ingredients={this.props.igns}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientSubtracted={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.igns)}
            /* When the ORDER NOW button is clicked in the BuildControls component,
             the purchaseHandler is executed which in turn set purchasing to
             true. Then the modal with the order summary will load. */
            ordered={this.purchaseHandler}
            price={this.props.grandTotal}/>
          </Auxilliary>
      );
    }

    return (
      <Auxilliary>
        {/* Revealed only when the user click on the ORDER NOW button. */}
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxilliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    igns: state.burgerBuilder.ingredients,
    grandTotal: state.burgerBuilder.totalPrice,
    readyToPurchase: state.burgerBuilder.purchaseable,
    updatedPurchaseState: state.burgerBuilder.updatePurchaseState,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadIngredients: (loadIgns) => dispatch(burgerBuilderActions.initIngredients()),
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));