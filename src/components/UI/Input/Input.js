import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch(props.elementType){
    case('input'):
    console.log("Inside Input input switch statement ", props.elementConfig)
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}
              onChange={props.changed}>{option.displayValue}</option>
          ))}
        </select>
        );
      break;
    default:
      console.log("Inside Input default switch statement ", props.elementConfig)
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}  />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );

};

export default input;