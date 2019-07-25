import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case 'LOAD_INGREDIENTS':
      return {
        ...state,
        ingredients: action.loadIgns
      }
    case actionTypes.ADD_INGREDIENT:
      return {
          // spread out the top level object and copy to a new object.
        ...state,
        ingredients: {
          // spread out the nested objects and copy to a new object.
          ...state.ingredients,
          //ES6 to get the property name. If ingredientName is bacon, this
          // will translates to state.ingredients.bacon.
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        // spread out the top level object and copy to a new object.
      ...state,
      ingredients: {
        // spread out the nested objects and copy to a new object.
        ...state.ingredients,
        //ES6 to get the property name. If ingredientName is bacon, this
        // will translates to state.ingredients.bacon.
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
          },
          totalPrice: 4,
          error: false
        };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return {
          ...state,
          error: true
        };
    default:
      return state;
  }


};


export default reducer;