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
    alert('You continue!');
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
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

  render(){
    let form = (
      <form>
        <Input elementType="..." elementConfig="..." value="..."/>
        <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
        <Input inputtype="input" type="text" name="street" placeholder="Your Street" />
        <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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