import React from  'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

// controls array of object has label for displaying the ingredients
// and type for the ingredients selected.
const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Meat', type: 'meat'},
  {label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
  {/* price set in parent component BurgerBuilder.*/}
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {/* Go through the array of objects and display the labels and add or remove the types. */}
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        /* ctrl.type contains what ingredients were added or removed. */
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientSubtracted(ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
    ))}
    <button
      className={classes.OrderButton}
      //If no ingredient were added the ORDER NOW button is disabled.
      disabled={!props.purchaseable}
      onClick={props.ordered}>ORDER NOW</button>
  </div>
)

export default buildControls;