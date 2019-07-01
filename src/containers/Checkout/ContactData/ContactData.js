import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name'
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: ''
        },
        zipcode:  {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Zip Code'
          },
          value: ''
        },
        country:  {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: ''
        },
        email:  {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
          },
          value: ''
        },
        deliveryMethod:  {
          elementType: 'select',
          elementConfig: {
            options: [{value: 'fastest', displayValue: 'fastest'},
                      {value: 'Cheapest', displayValue: 'Cheapest'}
                    ]
          },
          value: ''
        }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        console.log("Inside ContactData Axios post history", this.props.history)
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    console.log("Inside ContactData inputChangedHandler inputIdentifier value", inputIdentifier)
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    console.log("Inside ContactData inputChangedHandler updatedFormElement value", updatedFormElement)
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log("Inside ContactData inputChangedHandler updatedOrderForm value", updatedOrderForm)
    console.log("Inside ContactData inputChangedHandler state.orderForm value", this.state.orderForm)

    this.setState({orderForm: updatedOrderForm});
  }

  render() {
    const formElememtsArray = [];
    for (let key in this.state.orderForm) {
      formElememtsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    console.log("And the value of ContactData formElememtsArray is", formElememtsArray)
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElememtsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading){
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
export default ContactData;