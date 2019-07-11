import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredients';

const burger = (props) => {
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
      console.log(props)
      // Array(props.ingredients[igKey]) look more complicated than it is.
      // It's basically taking the value of ingredients[igKey]
      // which is a number and is creating empty arrays based on the number.
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // map call a function on every element and return an array.
        // The second argument i is just the index.
        // BurgerIngredient key could be bacon0, salad1, meat2, or meat2...
        // BurgerIngredient type could be bacon, salad, meat, or cheese.
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    }) //reduce that a callbakc function that take two require arguments - the accumlator and currentvalue
      .reduce((arr,el) => {
        //Flatten array to see if any ingredients has been added.
        return arr.concat(el);
      }, []);
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