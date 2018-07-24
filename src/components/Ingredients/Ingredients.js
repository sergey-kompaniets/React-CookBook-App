import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputBar from '../InputBar/InputBar';
import IngredientsList from '../IngredientsList/IngredientsList';

import { addIngredient } from '../../actions/ingredientsAction';
import Add from '../../images/add.svg';

class Ingredients extends Component{

    handleFormSubmit(name){
        const edit = false;
        this.props.addIngredient({ name, edit });
    } 

    render(){
        return(
            <div className='column'>
                <InputBar button={ <img src={ Add } alt='Add' /> } placeholder='Add ingredient' handleFormSubmit={ this.handleFormSubmit.bind(this) } />
                <IngredientsList />
            </div>
        )
    }
}

Ingredients.propTypes = {
    addIngredient: PropTypes.func.isRequired
}

export default connect(null, { addIngredient })(Ingredients);