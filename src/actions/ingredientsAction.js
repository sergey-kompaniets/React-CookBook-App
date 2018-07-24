export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';

export function addIngredient(ingredient){
    return{
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}

export function deleteIngredient(id){
    return{
        type: DELETE_INGREDIENT,
        payload: {
            id
        }
    }
}

export function editIngredient(obj){
    return{
        type: EDIT_INGREDIENT,
        payload: {
            ...obj
        }
    }
}