import React, { Component } from 'react';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  //   }

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()){
  //     //['salad', '1'...]
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //         ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ingredients: ingredients, totalPrice: price})
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render(){
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.igns}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
          /*// render={(props) => (<ContactData ingredients={this.props.igns} price={this.props.grandTotal} {...props}/>)} *//>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      igns: state.ingredients,
      grandTotal: state.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);