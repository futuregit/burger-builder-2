import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredients';

const burger = (props) => {
  //transformedIngredients takes an Object.keys which
  //  collect the array keys from props.BurgerIngredients.
  // The map takes the keys and and return a destructured
  //  array. The destructured map method retrieve the indexes and
  //  return BurgerIngredient component.

  const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    });
  console.log("Inside Burger transformedIngredients", transformedIngredients)
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;