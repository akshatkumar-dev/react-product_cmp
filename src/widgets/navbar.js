import React from 'react';
import {NavLink} from 'react-router-dom'
import './navbar.css'
const Navbar = () =>{
    return(
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-title">
                    Product Cmp
                </div>
                <div className="navbar-options">
                    <div className="navbar-option">
                        <NavLink to="/viewphones">
                        Phones
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                        <NavLink to="/viewlaptops">
                        Laptops
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                        <NavLink to="/login">
                        Login
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                    <NavLink to="/register">
                        Register
                        </NavLink>                    
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Navbar;