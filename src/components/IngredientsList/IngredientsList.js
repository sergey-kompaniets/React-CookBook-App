import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import InputBar from '../InputBar/InputBar';

import { deleteIngredient, editIngredient } from '../../actions/ingredientsAction';

import Delete from '../../images/delete.svg';
import Edit from '../../images/edit.svg';
import Mark from '../../images/mark.svg';

class IngredientsList extends Component{

    handleDeleteIngredient(id){
        this.props.deleteIngredient(id);
    }

    handleEditIngredients(obj){
        this.props.editIngredient(obj);
    }

    renderIngredients(){
        return _.map(this.props.ingredients, item =>{
       
                return(
                    <tr key={ item.id }>
                        <td>
                            { item.edit ? <InputBar button={ <img src={ Mark } alt='Mark' /> } value={ item.name } id={ item.id } handleFormSubmit={ this.handleEditIngredients.bind(this) }/> : item.name }
                        </td>
                        <td>
                            <button onClick={ () => this.handleEditIngredients({ id: item.id }) }>
                                <img src={ Edit } alt="Edit"/>
                            </button>
                            <button onClick={ () => this.handleDeleteIngredient(item.id) }>
                                <img src={ Delete } alt="Delete"/>
                            </button>
                        </td>
                    </tr>
                )
            
        })
    }

    render(){
        return(
            <div className='column'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                         { this.renderIngredients() }
                    </tbody>
                </table>
            </div>
        )
    }
}

IngredientsList.propTypes = {
    ingredients: PropTypes.object.isRequired,
    deleteIngredient: PropTypes.func.isRequired,
    editIngredient: PropTypes.func.isRequired
}

function mapStateToProps({ ingredients }){
    return { ingredients }
}

export default connect(mapStateToProps, { deleteIngredient, editIngredient })(IngredientsList);