import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredients';

const burger = (props) => {
  console.log("Inside Burger props", props)
  //transformedIngredients takes an Object.keys which
  //  tranform the props.ingredients object into an array
  //  of keys.
  // The map takes the keys and and return a destructured
  //  empty array. The destructured Array creates an empty array
  //  based on the key value number. Then, the array
  //  the number value retrieve the indexes and
  //  return BurgerIngredient components.

  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
      .reduce((arr,el) => {
        return arr.concat(el);
      }, []);
    console.log(transformedIngredients)
    if (transformedIngredients.length === 0){
      transformedIngredients = <p>Please start adding ingredients</p>;
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);