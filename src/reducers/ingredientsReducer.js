import _ from 'lodash';
import uuid from 'uuid/v1';

import { ADD_INGREDIENT, DELETE_INGREDIENT, EDIT_INGREDIENT } from '../actions/ingredientsAction';

const initialState = {
    1: {name: '1 pound ground beef', id: 1, edit: false},
    2: {name: '1/2 cup fine dry bread crumbs', id: 2, edit: false},
    3: {name: '1/2 teaspoon salt', id: 3, edit: false},
    4: {name: '1/2 teaspoon ground black pepper', id: 4, edit: false}
};

export default function(state = initialState, action){
    switch(action.type){

        case ADD_INGREDIENT:
            let id = uuid();
            
            return {
                ...state,
                [id]: {
                    id,
                    ...action.payload
                }
            }

        case DELETE_INGREDIENT:
            return _.omit(state, action.payload.id)
        
        case EDIT_INGREDIENT:
            return {
                ...state,
                [action.payload.id]: {
                   ...state[action.payload.id],
                   edit: !state[action.payload.id].edit,
                   ...action.payload
                }
            }

        default:
            return state;
    }
}