import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputBar.css';

class InputBar extends Component{ 

    constructor(props){
        super(props);
        this.state = {
            value: '',
            valid: true
        }
    }

    componentDidMount(){
        if(this.props.value){
            this.setState({
                value: this.props.value
            });
        }
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.value !== ''){
            if(this.props.id){
                this.props.handleFormSubmit({ name: this.state.value, id: this.props.id });
            } else{
                this.props.handleFormSubmit(this.state.value);
            }

            this.setState({
                value: '',
                valid: true
            });

        } else{
            this.setState({
                valid: false
            })
        }
        
    }

    onChange(e){
        this.setState({
            value: e.target.value,
            valid: true
        });
    }

    render(){
        return(
            <form onSubmit={ this.onSubmit.bind(this) } className='InputBar'>
                <input type='text' placeholder={ this.props.placeholder } name='ingredient' value={ this.state.value } onChange={ this.onChange.bind(this) } className={ this.state.valid ? '' : 'error' }/>
                <button type="submit">{ this.props.button }</button>
            </form>
        )
    }
}

InputBar.propTypes = {
    handleFormSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    button: PropTypes.node.isRequired
}

export default InputBar;
