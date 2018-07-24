import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ingredientsReducer from './ingredientsReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
    form: formReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer
});

export default rootReducer;