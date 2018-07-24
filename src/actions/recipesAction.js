export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';

export function addRecipe(obj){
    return{
        type: ADD_RECIPE,
        payload:{
            ...obj
        }
    }
}

export function deleteRecipe(id){
    return{
        type: DELETE_RECIPE,
        payload: {
            id
        }
    }
}

export function editRecipe(obj){
    return{
        type: EDIT_RECIPE,
        payload: {
            ...obj
        }
    }
}

