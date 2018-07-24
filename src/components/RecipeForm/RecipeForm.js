import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { addRecipe, editRecipe } from '../../actions/recipesAction';

import './RecipeForm.css';

import Delete from '../../images/delete.svg';

class RecipeForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            recipe: '',
            recipeIngredients: [],
            selectIngredient: '',
            ingredients: {},
            errors: {
                nameIsValid: true,
                recipeIsValid: true,
                recipeIngredientsIsValid: true
            },
            edit: false
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        if(id && this.props.recipes[id]){
            const recipe = this.props.recipes[id];
            let ingredients = { ...this.props.ingredients };

            recipe.ingredients.forEach( id => {
                ingredients = _.omit(ingredients, id);
            });
                
            this.setState({
                name: recipe.name,
                recipe: recipe.recipe,
                recipeIngredients: recipe.ingredients,
                ingredients,
                edit: true
            }); 

        } else{
            this.setState({
                ingredients: {...this.props.ingredients}
            });
        }

                    
    }

    renderSelect(){
        return(
            <select name='selectIngredient' value={ this.state.selectIngredient } onChange={ this.onInputChange.bind(this) } className={ this.state.errors.recipeIngredientsIsValid ? '' : 'input--error' } >
                <option value=''>Select ingredients</option>
            {
                _.map(this.state.ingredients, ing =>{
                    return (
                        <option value={ ing.id } key={ ing.id }>{ ing.name }</option>
                    )
                })
            }
            </select>
        )
    }

    renderIngredientsList(){
        return (
            <ul>
                {
                    this.state.recipeIngredients.map( ing => {
                        if(this.props.ingredients[ing]){
                            return (
                                <li key={ this.props.ingredients[ing].id }>
                                    { this.props.ingredients[ing].name }
                                    <button onClick={ () => this.handleDeleteIngredient(this.props.ingredients[ing].id) }>
                                        <img src={ Delete } alt="D"/>
                                    </button>
                                </li>
                            )
                        }
                        return null;
                    })
                }
            </ul>
        )
    }

    validationForm(){
        const state = this.state.errors;
        
        for(let key in state){
            state[key] = true
        }
        
        if(this.state.name === ''){
            state.nameIsValid = false;
        }

        if(this.state.recipe === ''){
            state.recipeIsValid = false;
        }

        if(this.state.recipeIngredients.length === 0){
            state.recipeIngredientsIsValid = false;
        }

        this.setState(state);

        if(this.state.errors.nameIsValid && this.state.errors.recipeIsValid && this.state.errors.recipeIngredientsIsValid ){
            return true;
        } else{
            return false;
        }

    }

    handleFormSubmit(e){
        e.preventDefault();

        const obj = {
            name: this.state.name,
            recipe: this.state.recipe,
            ingredients: this.state.recipeIngredients,
        }
        
        
        if(this.validationForm()){
            const id = this.props.match.params.id;
            if(id && this.props.recipes[id]){
                this.props.editRecipe({
                    ...obj,
                    id
                });
                this.props.history.push('/recipes');
            } else{
                this.props.addRecipe(obj);
                this.props.history.push('/recipes');
            }

        }
        
    }

    onInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const state = this.state.errors;

        state[`${name}IsValid`] = true;

        this.setState({
            [name]: value,
            state
        });
    }

    handleAddIngredient(e){
        e.preventDefault();
        if(this.state.selectIngredient !== ''){

            let recipeIngredients = this.state.recipeIngredients;
            
            let id = this.state.selectIngredient;

            recipeIngredients.push(id);

            let ingredients = _.omit(this.state.ingredients, recipeIngredients);
            const state = this.state.errors;

            state.recipeIngredientsIsValid = true;

            this.setState({
                selectIngredient: '',
                recipeIngredients,
                ingredients,
                state
            });
        }
    }

    handleDeleteIngredient(id){
        let recipeIngredients = this.state.recipeIngredients.filter(ing => {
            return ing !== id
        });
        
        const deletedIngredient = this.props.ingredients[id];
        
        this.setState({
            recipeIngredients,
            ingredients: { ...this.state.ingredients, [id]: deletedIngredient }
        });
    }

    render(){
        return(
            <div className='column RecipeForm'>
                <Link to='/recipes'>Back</Link>
                <div>
                    <form onSubmit={ this.handleFormSubmit.bind(this) } >
                        <label htmlFor='name' className={ this.state.errors.nameIsValid ? '' : 'input--error' } >Name</label>
                        <input type='text' name='name' value={this.state.name} id='name' onChange={ this.onInputChange.bind(this) } className={ this.state.errors.nameIsValid ? '' : 'input--error' } />
                        <label htmlFor='recipe' className={ this.state.errors.recipeIsValid ? '' : 'input--error' } >Recipe</label>
                        <textarea type='text' name='recipe' value={this.state.recipe} id='recipe' onChange={ this.onInputChange.bind(this) } className={ this.state.errors.recipeIsValid ? '' : 'input--error' } />
                        <h2>Ingredients</h2>
                        { this.renderSelect() }
                        <button onClick={ this.handleAddIngredient.bind(this) }>Add</button>
                        { this.renderIngredientsList() }
                        <hr/>
                        <button type='submit'>{ this.state.edit ? 'Edit' : 'Add Recipe' }</button>
                    </form>
                    <ul>
                    </ul>
                </div>
            </div>
        )
    }
}

RecipeForm.propTypes = {
    ingredients: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
    addRecipe: PropTypes.func.isRequired,
    editRecipe: PropTypes.func.isRequired
}

function mapStateToProps({ ingredients, recipes }){
    return { 
        ingredients,
        recipes
    }
}

export default connect(mapStateToProps, { addRecipe, editRecipe })(RecipeForm);