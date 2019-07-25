import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipcode:  {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Zip Code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        country:  {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email:  {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod:  {
          elementType: 'select',
          elementConfig: {
            options: [{value: 'fastest', displayValue: 'fastest'},
                      {value: 'Cheapest', displayValue: 'Cheapest'}
                    ]
          },
          value: 'fastest',
          validation: {},
          valid: true
        }
    },
    fromIsValid: false
  }

  orderHandler = (event) => {
    // event.preventDefault() stops the page from reloading
    event.preventDefault();
    const formData = {};
    // For each interation of the for statement,
    // formElementIdentifier is equal to
    // name, street, zipcode, country, email, and deliveryMethod
    for (let formElementIdentifier in this.state.orderForm){
      // formData for an example could be equal to user input like:
      // {name: "arnold", street: "1234 Main", zipcode: "60612", country: "US", email: "fred@email.com"}
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.igns,
      price: this.props.grandTotal,
      orderData: formData
    }
    this.props.onOrderBurger(order);
  }

  checkValidity(value, rules){
    let isValid = true;
    if (rules.required) {
      // .trim() removes whitespaces on either ends.
      // test to see if value really do have a value.
      isValid = value.trim() !== '' && isValid;
    }
    // rules.minLength or maxLength property is true if it exists and has any value.
    if (rules.minLength) {
      // Check first to see if the length of value is greater or equal to minLength.
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      // Only true if minLength statement returned true for IsValid
      // in addition to maxLength requirments.
      // In other words, are you with a range.
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // inputIdentifier is either:
    // name, street, zipcode, country, email, or deliveryMethod
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    // updatedFormElement may have something like:
    //  elementType: "input", elementConfig: {placeholder: "Zip Code", type: "text"}, value: "", validation: {…}, valid: false, …}
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    const formElememtsArray = [];
    for (let key in this.state.orderForm) {
      // config may have something like:
      //  elementType: "input", elementConfig: {placeholder: "Zip Code", type: "text"}, value: "", validation: {…}, valid: false, …}
      formElememtsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElememtsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading){
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      igns: state.burgerBuilder.ingredients,
      grandTotal: state.burgerBuilder.totalPrice,
      loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));