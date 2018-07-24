import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = (props) => { 
        return(
            <div className='Navbar'>
                <Link to='/ingredients'>Ingredients</Link>
                <Link to='/recipes'>Recipes</Link>
                <Link to='/search'>Search</Link>
            </div>
        )
}

export default Navbar;