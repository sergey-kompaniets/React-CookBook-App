import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './RecipeShow.css';

class RecipeShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            recipe: '',
            ingredients: []
        }
    }

    componentDidMount(){
        this.setState({
            name: this.props.recipe.name,
            recipe: this.props.recipe.recipe,
            ingredients: this.props.recipe.ingredients
        });
    }

    renderIngredients(){
        return(
            <ul>
                {
                    _.map(this.props.ingredients, ing =>{
                        if(this.state.ingredients.includes(ing.id)){
                            return (
                                <li key={ ing.id }>{ing.name}</li>
                            )
                        } else{
                            return null
                        }
                    })
                }
            </ul>

        )
    }

    render(){
        return(
            <div className='column RecipeShow'>
                <Link to='/recipes'>Back</Link>
                <h2>{ this.state.name }</h2>
                <h3>Recipe</h3>
                <p>{ this.state.recipe }</p>
                <h3>Ingredients</h3>
                { this.renderIngredients() }
            </div>
        )
    }
}

RecipeShow.propTypes = {
    recipe: PropTypes.object.isRequired,
    ingredients: PropTypes.object.isRequired
}

function mapStateToProps({ recipes, ingredients }, ownProps){
    return { 
        recipe: recipes[ownProps.match.params.id],
        ingredients
    }
}

export default connect(mapStateToProps)(RecipeShow);