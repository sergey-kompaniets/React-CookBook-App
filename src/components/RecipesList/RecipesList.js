import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteRecipe } from '../../actions/recipesAction';

import './RecipesList.css';

import Delete from '../../images/delete.svg';
import Edit from '../../images/edit.svg';
import Eye from '../../images/eye.svg';

class RecipesList extends Component{ 
    
    handleDeleteRecipe(id){
        this.props.deleteRecipe(id);
    }

    renderRecipes(){
        return (
            _.map(this.props.recipes, recipe =>{
                return(
                    <tr key={ recipe.id }>
                        <td>
                            { recipe.name }
                        </td>
                        
                        <td>
                            <Link to={`/recipes/show/${recipe.id}`}>
                            <img src={ Eye } alt="L"/>
                            </Link>
                            <Link to={`/recipes/edit/${recipe.id}`}>
                                <img src={ Edit } alt="E"/>
                            </Link>
                            <button onClick={ () => this.handleDeleteRecipe(recipe.id) }>
                                <img src={ Delete } alt="D"/>
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }

    render(){
        return(
            <div className='column'>
                <h2>Resipes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                         { this.renderRecipes() }
                    </tbody>
                </table>
            </div>
        )
    }
}

RecipesList.propTypes = {
    recipes: PropTypes.object.isRequired,
    deleteRecipe: PropTypes.func.isRequired
}

function mapStateToProps({ recipes }){
    return { recipes }
}

export default connect(mapStateToProps, { deleteRecipe })(RecipesList);