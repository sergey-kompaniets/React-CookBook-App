import uuid from 'uuid/v1';
import _ from 'lodash';

import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE } from '../actions/recipesAction';

const initState = {
    1: {
        id: 1,
        name: 'Burger',
        recipe: 'Preheat an outdoor grill for high heat and lightly oil grate.',
        ingredients: [1,2,3,4],

    }
}

export default function(state = initState, action){
    switch(action.type){

        case ADD_RECIPE:
            const id = uuid();
            
            return {
                ...state,
                [id]: {
                    id,
                    ...action.payload
                }
            }
        
        case DELETE_RECIPE:
            return _.omit(state, action.payload.id);

        case EDIT_RECIPE:
            return {
                ...state,
                [action.payload.id]: {
                   ...action.payload
                }
            }

        default:
            return state;
    }
}