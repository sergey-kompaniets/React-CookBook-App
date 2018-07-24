import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import InputBar from '../InputBar/InputBar';

import Delete from '../../images/delete.svg';
import Edit from '../../images/edit.svg';
import Eye from '../../images/eye.svg';
import Loupe from '../../images/loupe.svg';

class Search extends Component{

    constructor(props){
        super(props);
        this.state = {
            foundRecipes: {}
        }
    }

    filterRecipes(name){
        let foundRecipes = {};
        
            _.map(this.props.recipes, recipe =>{
                if(recipe.name.toLowerCase().includes(name.toLowerCase())){
                    foundRecipes = {
                        ...foundRecipes,
                        [recipe.id]: {
                            ...recipe
                        }
                    }
                }
            });

        this.setState({
            foundRecipes
        });
    }

    handleDeleteRecipe(id){
        this.props.deleteRecipe(id);
    }

    renderRecipes(){
        return (
            _.map(this.state.foundRecipes, recipe =>{
                return(
                    <tr key={ recipe.id }>
                        <td>
                            { recipe.name }
                        </td>
                        <td>
                            <Link to={`/recipes/show/${recipe.id}`}>
                            <img src={ Eye } alt="Eye"/>
                            </Link>
                            <Link to={`/recipes/edit/${recipe.id}`}>
                                <img src={ Edit } alt="Edit"/>
                            </Link>
                            <button onClick={ () => this.handleDeleteRecipe(recipe.id) }>
                                <img src={ Delete } alt="Delete"/>
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }

    handleFormSubmit(name){
        this.filterRecipes(name);
    }

    render(){
        return(
            <div className='column'>
                <InputBar button={ <img src={ Loupe } alt='Loupe' /> } handleFormSubmit={ this.handleFormSubmit.bind(this) }/>
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

Search.propTypes = {
    recipes: PropTypes.object.isRequired
}

function mapStateToProps({ recipes }){
    return { recipes }
}

export default connect(mapStateToProps)(Search);