import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Ingredients from '../Ingredients/Ingredients';
import Recipes from '../Recipes/Recipes';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeShow from '../RecipeShow/RecipeShow';
import Search from '../Search/Search';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='grid'>
            <Navbar />
            <Switch>
              <Route path='/ingredients' component={ Ingredients }/>
              <Route path='/recipes/edit/:id' component={ RecipeForm }/>
              <Route path='/recipes/add' component={ RecipeForm }/>
              <Route path='/recipes/show/:id' component={ RecipeShow }/>
              <Route path='/recipes' component={ Recipes }/>
              <Route path='/search' component={ Search }/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
